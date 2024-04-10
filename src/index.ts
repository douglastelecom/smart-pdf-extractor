import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import "dotenv/config";
import { DataExtractedController } from 'controller/dataExtractedController';
import OpenAI from 'openai';
import fs from 'fs';
import { empty } from '@prisma/client/runtime/library';

const app = express();
const server = createServer(app);
const port = process.env.PORT;

const openai = new OpenAI();

app.use(express.json())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.post("/file", async (req: Request, res: Response) => {
    const filegpt = await openai.files.create({ file: fs.createReadStream(req.body.path), purpose: req.body.purpose });
    console.log(filegpt)
})

app.post("/assistant", async (req: Request, res: Response) => {
    const assistant = await openai.beta.assistants.create(req.body);
    res.send(assistant)
})

app.post("/thread", async (req: Request, res: Response) => {
    const run = await openai.beta.threads.createAndRunPoll({
        assistant_id: req.body.assistant_id,
        thread: {
            messages: req.body.messages
    }});
    if (run.status === 'completed') {
        const messages: any = await openai.beta.threads.messages.list(
            run.thread_id
        );
        console.log("foi")
        res.send(messages.data[0].content[0].text.value)
    } else {
        console.log("não foi")
        res.send(run.status)
    }
})

