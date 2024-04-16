import OpenAI from "openai";
import { MongoClient } from 'mongodb';

const openai = new OpenAI();

export class OpenAIService {

    async completion(reqBody: any, article: any){
        const client = new MongoClient(reqBody.mongoUrl)
        const collection = client.db(reqBody.db).collection(reqBody.collection)
        openai.apiKey = reqBody.openaiKey
        const responseCompletion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Você será minha ferramenta para extração de dados." },
            { role: "user", content: "Extraia as informações em português do artigo abaixo respondendo com um json no formato: " + reqBody.json + "/n " + article}],
            model: reqBody.model,
            response_format: {type: "json_object"}
        });
        const completionResp = await collection.insertOne(JSON.parse(responseCompletion.choices[0].message.content!))
        console.log(completionResp)
        return completionResp
    }

}