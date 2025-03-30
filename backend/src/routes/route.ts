import express from "express";
import pdfRouter from "./pdfUpload";
import queryrouter from "./queryRoute";

const router=express.Router();

router.use("/datatoprocess",pdfRouter);
router.use("/askai",queryrouter);


export default router;

