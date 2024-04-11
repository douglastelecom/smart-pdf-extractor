import { Request, Response } from 'express';
import { OpenAIService } from 'service/openAIService';

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
}