import express ,{Request,Response} from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs"
import { gen } from "../embedding/embd";
import { client,collectionName} from "../services/milvusServices";
import { PrismaClient } from "@prisma/client";
import { IndexType } from "@zilliz/milvus2-sdk-node";
import { chunk } from "../chunking/chunk";

const upload = multer({ dest: 'uploads/' })
const prisma=new PrismaClient();


const pdfrouter=express.Router();
pdfrouter.use(express.json())

            
pdfrouter.post("/pdfUp",upload.single("pdf"),(async (req: Request, res: Response) => {
      try {
        if (!req.file?.path || !req.file) {
            res.status(400).send("No file uploaded");
            return;
        }
  
        const pdfBuffer =  await fs.promises.readFile(req.file.path);
        const data = await pdfParse(pdfBuffer);
        
        const spiltArr= data.text.split("\n");
        const textArray = spiltArr.filter(line => typeof line === 'string' && line.trim().length > 0);

        const maxChunkSize = 400; 
        const overlap = 100; 
        const textChunks = chunk({textArray, maxChunkSize, overlap});
  
        let checkGen=false;

       
        const embeddingResponse = await gen(textChunks);
        if(!embeddingResponse||!embeddingResponse.data)
        {
          throw new Error("Failed to generate the embeddings");
        }
        // checkGen=true;

      
        if (embeddingResponse&&embeddingResponse.data) {
            const fieldsData=embeddingResponse.data.map((item)=>({
              vector_field:item.embedding,
            }))

            const milvusResponse=await client.insert({
              collection_name:collectionName,
              fields_data:fieldsData
            })  

            const vectorId=milvusResponse.IDs;

            await client.loadCollection({
              collection_name: collectionName,
            })
            
            if ('int_id' in vectorId && vectorId.int_id) {
              const idArray = vectorId.int_id.data;
              
              const docId=`doc_${Date.now()}`;
              
              const pgInsertres=await prisma.fileDta.create({
                data:{
                  docId:docId,
                  embeddingGenerated:checkGen                
                }
              });

              const chunksData = textChunks.map((chunk, index) => ({
                fileId:pgInsertres.id,
                chunk: chunk,
                vectorId: idArray[index].toString(),
              }));

              await prisma.fileMetaData.createMany({
                data:chunksData
              })
              
              
              res.json({
                message:"All operation are done !"
              })
            } else {
              console.error("error in id");
            }
        }
      } catch (e) {
        console.error("Error generating embeddings ", e);
        res.status(500).json({ error: "Internal Server Error", details: (e as Error).message });
      }
      
    }) 
);

export default pdfrouter;