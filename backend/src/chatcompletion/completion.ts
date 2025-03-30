import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config();

const key=process.env.OPENAI_API_KEY;
const openai=new OpenAI({
    apiKey:key
});

type inputQuery=string;

// will export this function and use this in the route where this will act as the assistant 
export const chatCompl= async (content:inputQuery)=>{
    try{
        const completion=await openai.chat.completions.create({
            messages:[
                {role:"system",content:"You are a helpful assistant for summarizing information."},
                {role:"user",content:content},
            ],
            model:"gpt-4o",
            max_tokens:500,
            store:true
        });
        return completion.choices[0];

    }catch(e){
        console.log("Error generating completion",e);
        throw new Error("Failed to generate summary.");
    }
}