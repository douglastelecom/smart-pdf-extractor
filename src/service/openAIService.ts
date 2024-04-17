import OpenAI from "openai";
import { MongoClient } from 'mongodb';



export class OpenAIService {

    async completion(reqBody: any, article: any){
        try{
            const openai = new OpenAI({apiKey: reqBody.openaiKey});
            const client = new MongoClient(reqBody.mongoUrl)
            const collection = client.db(reqBody.db).collection(reqBody.collection)
            const responseCompletion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "Você será minha ferramenta para extração de dados." },
                { role: "user", content: "Extraia as informações em português do artigo abaixo respondendo com um json no formato: " + reqBody.json + "/n " + article}],
                model: reqBody.model,
                response_format: {type: "json_object"}
            });
            const completionResp = await collection.insertOne(JSON.parse(responseCompletion.choices[0].message.content!))
            return completionResp
        }catch(error){
            throw error
        }
    }

    async testMongoUrl(mongoUrl: string){
        try{
            console.log(mongoUrl)
            const client = new MongoClient(mongoUrl)
            await client.connect()
            console.log("Sucesso no mongo")
        }catch(error){
            console.log("Erro no mongo")
            throw new Error("Falha de conecção com o MongoDB Atlas.")
        }
    }

    async testOpenaiKey(reqBody: any){
        try{
            const openai = new OpenAI({apiKey: reqBody.openaiKey});
            console.log(reqBody)
            openai.apiKey = reqBody.openaiKey
            const responseCompletion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "Isso é um teste." },
                { role: "user", content: "Isso é um teste de conexão. Reposta apenas com um json {'resposta': 'ok'}"}],
                model: reqBody.model,
                response_format: {type: "json_object"}
            });
            console.log("Sucesso no openai")
        } catch(error){
            console.log("Erro no openai")
            throw new Error("Falha de conecção com a API GPT.")
        }
    }
}