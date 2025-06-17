import { chatCompl } from "../chatcompletion/completion";
import express ,{Request,Response} from "express";
import { gen } from "../embedding/embd";
import { createPrompt } from "../prompt/prompt";
import { client, collectionName } from "../services/milvusServices";
import { translation } from "../query-translation/query-translation";
import { PrismaClient } from "@prisma/client";


const prisma=new PrismaClient();
const queryrouter=express.Router();

export let exportQuery:string|null=null; 


queryrouter.post("/query",async(req:Request,res:Response)=>{
  try{
    const {userInp}=req.body;


    if(!userInp)
    {
       res.status(400).send("No inputs");
       return;
    }

    // query translation is here 
    
    const translatedQuery=await translation(userInp);
    console.log(translatedQuery);

    // exporting the user query for translation 

    exportQuery=userInp;
    

    const embeddingQuery=await gen(userInp);

    if(!embeddingQuery||!embeddingQuery.data)
    {
      throw new Error("Failed to generate the embeddings");
    }

    const vectorQuery=embeddingQuery.data[0].embedding;

    await client.loadCollection({
      collection_name: collectionName,
    });

    const searchMilvus=await client.search({
      collection_name:collectionName,
      vectors:[vectorQuery],
      topk:5,
      params:{noprobe:16}
    });

    if (!searchMilvus.results||!searchMilvus.results[0]) {
      throw new Error("No results found");
    }

    const vectorIds = searchMilvus.results.map((result) => result.id.toString());

    const chunks = await prisma.fileMetaData.findMany({
      where: {
          vectorId: {
              in: vectorIds
          }
      },
      include: {
          fileDta: true
      }
    });

    // console.log("Query Executed");
    
    const prompt=await createPrompt(userInp,chunks);

    const summaryOutput = await chatCompl(prompt);


    // if (!chunks || chunks.length === 0) {
    //   console.log("No chunks found for the given vector IDs");
    // }

    res.json({
      output:summaryOutput.message
    })

  }catch(e)
  {
    console.log("Error occured",e);
    res.status(500).send("Internal server error");
  }
  
});

queryrouter.post("/summarizedoc",async (req:Request,res:Response)=>{

  try{
    const { fileId } = req.body;

    if (!fileId) {
      res.status(400).send("fileId is required");
      return;
    }

    const allChunks=await prisma.fileMetaData.findMany({
      where:{
        fileId:fileId
      },
      include:{
        fileDta:true
      }
    })

    if (!allChunks || allChunks.length === 0) {
      res.status(404).send("No chunks found for this document");
      return;
    }

    const fullText: string = allChunks
    .map((chunk: { chunk: string }) => chunk.chunk)
    .join("\n\n");

    const prompt = `Summarize the following document without loosing the relavant information and the main points and the user should understand the provided document from the given summary in and out the summary should each thing nothing should be left :\n\n${fullText}`;

    const summaryOutput = await chatCompl(prompt);

    res.json({
      summary: summaryOutput.message
    });


      
  }catch(e:any){
    console.log("Error occured while summarizing the doc !",e);
  }
})

export default queryrouter;

// function useState(): [any, any] {
//   throw new Error("Function not implemented.");
// }
