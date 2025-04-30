type Query = string;
type Chunks = any[];

export const createPrompt = async (userQuery: Query, chunks: Chunks) => {
    const chunksText = chunks.map((chunk, index) => `Chunk ${index + 1}: ${chunk.chunk}`).join("\n\n");

    return `{
        "user_query": "${userQuery}",
        "document_chunks": [
            ${chunks.map((chunk, index) => `{"chunk_${index + 1}": "${chunk.chunk}"}`).join(",")}
        ],
        "instructions": "Answers the user query and use the information in the documents and use it to make the generation better and make sure that you are not answering anything that is not in the document and you should tell the user that i can't answer this it is beyond my scope do not say that their are not chunks in the document instead say that i can't find the data related to what you are asking and also if the chunks are found answer the query in such a way that the user understands it well and also gets the clear cut information without loosing the data that is retrived from the document else strictly do not answer it "
    }`;
};
    