import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import "dotenv/config";
import { DataExtractedController } from 'controller/dataExtractedController';
import OpenAI from 'openai';
import fs from 'fs';

const app = express();

const server = createServer(app);

const port = process.env.PORT;

const openai = new OpenAI();


app.use(express.json())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.get("/completion", async (req: Request, res: Response) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Você será meu assistente" },
        { role: "user", content: req.body.question }],
        model: "gpt-3.5-turbo",
    });
    res.send(completion.choices[0].message.content);
})

app.post("/", async (req: Request, res: Response) => {
    const dataExtractedController = new DataExtractedController()
    res.send(await dataExtractedController.post(req, res));
})

app.post("/file", async (req: Request, res: Response) => {
    const filegpt = await openai.files.create({ file: fs.createReadStream('src/assets/articles/corona.pdf'), purpose: 'assistants' });
    console.log(filegpt)
})

app.post("/assistant", async (req: Request, res: Response) => {
    const assistant = await openai.beta.assistants.create({
        name: "pdf-smart-extractor",
        description: "Você será minha ferramenta para extrair informações de arquivos pdf e retorná-los em formato json.",
        model: "gpt-3.5-turbo",
        tools: [{"type": "retrieval"}],
        file_ids: ["file-3iAxjWsbxZay5c82c7jWI9lF"]
      });
      res.send(assistant)
})