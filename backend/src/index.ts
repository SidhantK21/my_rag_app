import router from "./routes/route";
import express,{Response} from "express";
import cors from "cors";
import { initailzeService } from "./services/milvusServices";
import dotenv from "dotenv";
import userAuthrouter from "./routes/userAuth";
dotenv.config();

const app=express();
const port=process.env.PORT;

initailzeService()
  .then(() => console.log("Milvus service initialized."))
  .catch((err) => console.error("Milvus init error:", err));

app.use(
    cors({
      origin: "http://localhost:5173",
    })
);

app.use(express.json());

app.use("/services", router);
app.use("/auth",userAuthrouter);

app.get("/", (res:Response) => {
    res.send("Working");
});

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})