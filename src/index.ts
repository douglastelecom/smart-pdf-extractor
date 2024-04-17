import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import "dotenv/config";
import { DataExtractedController } from 'controller/dataExtractedController';
import OpenAI from 'openai';
import fs from 'fs';
import { empty } from '@prisma/client/runtime/library';
import { OpenAIController } from 'controller/openAIController';
import multer from 'multer';


const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

const server = createServer(app);
const port = process.env.PORT;
const openai = new OpenAI();
const upload = multer();
const openaiController = new OpenAIController()

app.use(express.json())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.post("/completion", upload.single('file'), async (req: Request, res: Response) => {
    await openaiController.completion(req, res);
})

app.post("/test", async (req: Request, res: Response) => {
    console.log(req.body)
    await openaiController.testApi(req, res)
})


