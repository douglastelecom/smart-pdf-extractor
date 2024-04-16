import { Request, Response } from 'express';
import { OpenAIService } from 'service/openAIService';
import fs from 'fs';
import PdfParse from 'pdf-parse';

export class OpenAIController {
    openAIService = new OpenAIService()

    async completion(req: Request, res: Response){
        const pdf = (await PdfParse(req.file!.buffer))
        const reqCompletion = JSON.parse(req.body.json)
        const completionResp = await this.openAIService.completion(reqCompletion,pdf.text)
        console.log("Id: " + completionResp.insertedId)
        console.log("acknowledged: " + completionResp.acknowledged)
        res.send(completionResp).status(200)
    }

    
}