import express, {Request, Response, NextFunction} from 'express';
import {createServer} from 'http';
import "dotenv/config";
import { DataExtractedController } from 'controller/dataExtractedController';

const app = express();

const server = createServer(app);

const port = process.env.PORT;

app.use(express.json())
 
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.get("/", (req: Request, res: Response)=>{
    console.log(req.body)
    res.send("Hello World!");
})

app.post("/", async (req: Request, res: Response)=>{
    const dataExtractedController = new DataExtractedController()
    res.send(await dataExtractedController.post(req, res));
})