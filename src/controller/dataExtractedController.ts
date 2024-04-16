import { Request, Response } from 'express';
import { DataExtractedService } from "service/dataExtractedService";

class DataExtractedController {
    dataExtractedService = new DataExtractedService()
    async post(req: Request, res: Response) {
        console.log(req.body)
        //const dataExtracted = await this.dataExtractedService.createDataExtracted(req.body.project)
        res.send().status(200)
    }
}
export {DataExtractedController}