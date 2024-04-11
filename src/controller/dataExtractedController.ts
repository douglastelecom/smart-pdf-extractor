import { Request, Response } from 'express';
import { DataExtractedService } from "service/dataExtractedService";

class DataExtractedController {
    dataExtractedService = new DataExtractedService()
    async post(req: Request, res: Response) {
        const dataExtracted = await this.dataExtractedService.createDataExtracted(req.body.project)
        res.send(dataExtracted)
    }
}
export {DataExtractedController}