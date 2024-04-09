import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import "dotenv/config";
import { DataExtractedController } from 'controller/dataExtractedController';
import OpenAI from 'openai';

const app = express();

const server = createServer(app);

const port = process.env.PORT;

const openai = new OpenAI();

app.use(express.json())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.get("/", async (req: Request, res: Response) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
    });
    res.send(completion.choices[0]);
})

app.post("/", async (req: Request, res: Response) => {
    const dataExtractedController = new DataExtractedController()
    res.send(await dataExtractedController.post(req, res));
})