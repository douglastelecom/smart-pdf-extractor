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

app.get("/completion", async (req: Request, res: Response) => {
    await openaiController.completion(req, res);
    res.send().status(200)
})


