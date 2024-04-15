import { Utils } from './utils';
import OpenAI from "openai";
import fs from 'fs';
import { MongoClient } from 'mongodb';

const openai = new OpenAI();
const utils = new Utils();
const client = new MongoClient(process.env.DATABASE_URL!)
const collection = client.db('extractor-db').collection('data_extracted')

export class OpenAIService {

    async completion(json: any, article: any, model: any){
        const responseCompletion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Você será minha ferramenta para extração de dados." },
            { role: "user", content: "Extraia as informações em português do artigo abaixo respondendo com um json no formato: " + json + "/n " + article}],
            model: model,
            response_format: {type: "json_object"}
        });
        return collection.insertOne(JSON.parse(responseCompletion.choices[0].message.content!))
    }

}