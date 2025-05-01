type Query = string;
type Chunks = any[];

export const createPrompt = async (userQuery: Query, chunks: Chunks) => {
    const chunksText = chunks.map((chunk, index) => `Chunk ${index + 1}: ${chunk.chunk}`).join("\n\n");

    return `{
        "user_query": "${userQuery}",
        "document_chunks": [
            ${chunks.map((chunk, index) => `{"chunk_${index + 1}": "${chunk.chunk}"}`).join(",")}
        ],
        "instructions": "Answer the user query which the user is asking from the document given and the retrieved data from the document and it should be in a professional and casual tone in a mixed way and keep in mind do not give any generalized information to the user "
    }`;
};
    