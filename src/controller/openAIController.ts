import { Request, Response } from 'express';
import { OpenAIService } from 'service/openAIService';
import fs from 'fs';
import PdfParse from 'pdf-parse';

export class OpenAIController {
    openAIService = new OpenAIService()
    
    async insertFile(req: Request, res: Response){
        const filegpt = await this.openAIService.insertFile(req.body.path, req.body.purpose)
        res.send(filegpt)
    }

    async createAssistant(req: Request, res: Response){
        const assistantgpt = await this.openAIService.createAssist(req.body)
        res.send(assistantgpt)
    }

    async createAndRunThread(req: Request, res: Response){
        const threadgpt = await this.openAIService.createAndRunThread(req.body)
        res.send(threadgpt)
    }

    async sendComplete(req: Request, res: Response){
        const file = fs.readFileSync("src/assets/articles/corona.pdf")
        // PdfParse(file).then(function(data) {
        //     console.log(data.text)
        // })
        const pdfParse = (await PdfParse(file)).text
        res.send( await this.openAIService.sendCompletion(req.body.json , pdfParse, req.body.model ));
        // const responseComplete = awaot this.openAIService.sendCompletion()
    }
}