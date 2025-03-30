import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const apikey=process.env.OPENAI_API;


const openai = new OpenAI({
    apiKey:apikey
});

export const gen=async (inputs: string[])=>{
    try{
        const embedding = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: inputs,
          encoding_format: "float",
        }); 
        return embedding;
        
    }catch(e)
    {
        console.log("Error",e);
    }
}