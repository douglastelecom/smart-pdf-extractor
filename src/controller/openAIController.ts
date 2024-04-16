import { Request, Response } from 'express';
import { OpenAIService } from 'service/openAIService';
import fs from 'fs';
import PdfParse from 'pdf-parse';

export class OpenAIController {
    openAIService = new OpenAIService()

    async completion(req: Request, res: Response){
        const pdf = (await PdfParse(req.file!.buffer))
        const reqCompletion = JSON.parse(req.body.json)
        console.log(reqCompletion.mongoUrl)
        const completionResp = await this.openAIService.completion(reqCompletion,pdf.text)
        res.send(completionResp).status(200)
    }

    
}