"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apikey = process.env.OPENAI_API_KEY;
const openai = new openai_1.default({
    apiKey: apikey
});
const gen = async (inputs) => {
    try {
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: inputs,
            encoding_format: "float",
        });
        return embedding;
    }
    catch (e) {
        console.log("Error", e);
    }
};
exports.gen = gen;
