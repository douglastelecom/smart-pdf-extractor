import { MongoClient } from 'mongodb';

export class MongodbService {

    connect(mongoUrl: string) {
        return new MongoClient(mongoUrl)
    }

    async testConnection(mongoUrl: string) {
        try {
            console.log(mongoUrl)
            const client = new MongoClient(mongoUrl)
            await client.connect()
            console.log("Sucesso no mongo")
        } catch (error: any) {
            console.log("Erro no mongo")
            console.log(error.message)
            throw new Error("Falha de conecção com o MongoDB Atlas.")
        }
    }

    async saveJson(reqBody: any, json: any) {
        try{
            const client = new MongoClient(reqBody.mongoUrl)
            const collection = client.db(reqBody.db).collection(reqBody.collection)
            const completionResp = await collection.insertOne(json)
            return completionResp
        } catch(error: any){
            throw error
        }

    }
}