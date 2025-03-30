"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrompt = void 0;
const createPrompt = async (userQuery, chunks) => {
    const chunksText = chunks.map((chunk, index) => `Chunk ${index + 1}: ${chunk.chunk}`).join("\n\n");
    return `{
        "user_query": "${userQuery}",
        "document_chunks": [
            ${chunks.map((chunk, index) => `{"chunk_${index + 1}": "${chunk.chunk}"}`).join(",")}
        ],
        "instructions": "Perform the requested operation strictly based on the given document chunks. Do not use any external knowledge."
    }`;
};
exports.createPrompt = createPrompt;
