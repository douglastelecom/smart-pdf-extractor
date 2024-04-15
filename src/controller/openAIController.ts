import { Request, Response } from 'express';
import { OpenAIService } from 'service/openAIService';
import fs from 'fs';
import PdfParse from 'pdf-parse';

export class OpenAIController {
    openAIService = new OpenAIService()

    async completion(req: Request, res: Response){
        const file = fs.readFileSync("src/assets/articles/corona.pdf")
        const pdfParse = (await PdfParse(file)).text
        res.send( await this.openAIService.completion(req.body.json , pdfParse, req.body.model ));
    }
}