import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import "dotenv/config";
import { DataExtractedController } from 'controller/dataExtractedController';
import OpenAI from 'openai';
import fs from 'fs';
import { empty } from '@prisma/client/runtime/library';
import { OpenAIController } from 'controller/openAIController';

const app = express();
const server = createServer(app);
const port = process.env.PORT;

const openai = new OpenAI();

const openaiController = new OpenAIController()

app.use(express.json())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.post("/file", async (req: Request, res: Response) => {
   openaiController.insertFile(req, res)
})

app.post("/assistant", async (req: Request, res: Response) => {
    openaiController.createAssistant(req, res)
})

app.post("/thread", async (req: Request, res: Response) => {
    openaiController.createAndRunThread(req, res)
})


