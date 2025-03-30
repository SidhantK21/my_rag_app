"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const fs_1 = __importDefault(require("fs"));
const embd_1 = require("../embedding/embd");
const milvusServices_1 = require("../services/milvusServices");
const client_1 = require("@prisma/client");
const chunk_1 = require("../chunking/chunk");
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const prisma = new client_1.PrismaClient();
const pdfrouter = express_1.default.Router();
pdfrouter.use(express_1.default.json());
pdfrouter.post("/pdfUp", upload.single("pdf"), (async (req, res) => {
    var _a;
    try {
        if (!((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || !req.file) {
            res.status(400).send("No file uploaded");
            return;
        }
        const pdf = fs_1.default.readFileSync(req.file.path);
        const data = await (0, pdf_parse_1.default)(pdf);
        const spiltArr = data.text.split("\n");
        const textArray = spiltArr.filter(line => typeof line === 'string' && line.trim().length > 0);
        const maxChunkSize = 400;
        const overlap = 100;
        const textChunks = (0, chunk_1.chunk)({ textArray, maxChunkSize, overlap });
        let checkGen = false;
        const embeddingResponse = await (0, embd_1.gen)(textChunks);
        if (!embeddingResponse || !embeddingResponse.data) {
            throw new Error("Failed to generate the embeddings");
        }
        checkGen = true;
        if (embeddingResponse && embeddingResponse.data) {
            const fieldsData = embeddingResponse.data.map((item) => ({
                vector_field: item.embedding,
            }));
            const milvusResponse = await milvusServices_1.client.insert({
                collection_name: milvusServices_1.collectionName,
                fields_data: fieldsData
            });
            const vectorId = milvusResponse.IDs;
            await milvusServices_1.client.loadCollection({
                collection_name: milvusServices_1.collectionName,
            });
            if ('int_id' in vectorId && vectorId.int_id) {
                const idArray = vectorId.int_id.data;
                const docId = `doc_${Date.now()}`;
                const pgInsertres = await prisma.fileDta.create({
                    data: {
                        docId: docId,
                        embeddingGenerated: checkGen
                    }
                });
                const chunksData = textChunks.map((chunk, index) => ({
                    fileId: pgInsertres.id,
                    chunk: chunk,
                    vectorId: idArray[index].toString(),
                }));
                await prisma.fileMetaData.createMany({
                    data: chunksData
                });
                res.json({
                    message: "All operation are done !"
                });
            }
            else {
                console.error("error in id");
            }
        }
    }
    catch (e) {
        console.error("Error generating embeddings ", e);
        res.status(500).json({ error: "Internal Server Error", details: e.message });
    }
}));
exports.default = pdfrouter;
