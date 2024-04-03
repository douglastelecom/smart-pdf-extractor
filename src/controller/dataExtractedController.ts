import { Request, Response } from 'express';
import { DataExtractedService } from "service/dataExtractedService";

class DataExtractedController {
    async post(req: Request, res: Response) {
        const dataExtractedService = new DataExtractedService()
        const {project} = req.body
        const dataExtracted = await dataExtractedService.createDataExtracted(project)
        res.send(dataExtracted)
    }
}
export {DataExtractedController}