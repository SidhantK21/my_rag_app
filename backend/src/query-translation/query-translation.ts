import { exportQuery } from "../routes/queryRoute";
import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config();

const geminiKey=process.env.GOOGLE_API_KEY;

export const translation= async (userInp:string)=>{
    
    const googleClient = new OpenAI({
        apiKey: geminiKey,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    const response = await googleClient.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            { role: "system", content: "You are expert at query translation i will give you a user query and you will give me 3 different types of query translations and also remember that do not return me anyother word or sentence and 3 translations that's it keep it in mind and it should be in array format "
             },
            {
                role: "user",
                content: userInp,
            },
        ],
        response_format:{"type":"json_object"}
       
    });

    const content = response.choices[0].message.content!; 

    // we can export this variable content for the query and use the for in the other place 

    const translationsQueries: string[] = JSON.parse(content);
    const queryObj: Record<string, string> = {}; 

    for (let i = 0; i < translationsQueries.length; i++) {
        queryObj[`translation_${i}`] = translationsQueries[i]; 
    }

    return queryObj;
    
}


