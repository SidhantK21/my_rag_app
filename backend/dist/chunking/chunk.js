"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = void 0;
const chunk = ({ textArray, maxChunkSize, overlap }) => {
    const chunks = [];
    let currentChunk = "";
    for (let i = 0; i < textArray.length; i++) {
        const line = textArray[i].trim();
        // If the line itself is longer than maxChunkSize, split it
        if (line.length > maxChunkSize) {
            const parts = line.match(new RegExp(`.{1,${maxChunkSize}}`, "g")) || [];
            for (let part of parts) {
                if (currentChunk.length > 0) {
                    chunks.push(currentChunk.trim());
                    currentChunk = ""; // Start a new chunk
                }
                chunks.push(part.trim());
            }
            continue; // Move to the next line
        }
        // Add the line to the current chunk if it fits
        if (currentChunk.length + line.length + 1 <= maxChunkSize) {
            currentChunk += (currentChunk ? " " : "") + line;
        }
        else {
            // Push the current chunk and start a new one with overlap
            chunks.push(currentChunk.trim());
            currentChunk = currentChunk.slice(-overlap).trim() + " " + line;
        }
    }
    // Push the last chunk if it has content
    if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
    }
    return chunks;
};
exports.chunk = chunk;
