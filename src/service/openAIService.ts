import OpenAI from "openai";

export class OpenAIService {

    async completion(reqBody: any, article: any){
        try{
            const openai = await this.connect(reqBody.openaiKey)
            const responseCompletion = await openai.chat.completions.create({
                messages: [{ role: "system", content: "Você será minha ferramenta para extração de dados." },
                { role: "user", content: "Extraia as informações em português do artigo abaixo respondendo com um json no formato: " + reqBody.json + "/n " + article}],
                model: reqBody.model,
                response_format: {type: "json_object"}
            });
            const response = JSON.parse(responseCompletion.choices[0].message.content!)
            return response
        }catch(error: any){
            console.log(error)
            throw error
        }
    }

    async connect(apiKey: string){
        return new OpenAI({apiKey: apiKey})
    }

    async testConnection(reqBody: any){
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
        } catch(error: any){
            console.log("Erro no openai")
            console.log(error.message)
            throw new Error("Falha de conecção com a API GPT.")
        }
    }
}