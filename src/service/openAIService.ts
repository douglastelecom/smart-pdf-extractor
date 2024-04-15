import { Utils } from './utils';
import OpenAI from "openai";
import fs from 'fs';

const openai = new OpenAI();
const utils = new Utils();
export class OpenAIService {
    async insertFile(path: string, purpose: any){
        const filegpt = await openai.files.create({ file: fs.createReadStream(path), purpose: purpose })
        return filegpt
    }

    async createAssist(assistant: any){
        const assistantgpt = await openai.beta.assistants.create(assistant);
        return assistantgpt
    }

    async sendCompletion(json: any, article: any, model: any){
        const responseCompletion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Você será minha ferramenta para extração de dados." },
            { role: "user", content: "Extraia as informações em português do artigo abaixo respondendo com um json no formato: " + json + "/n " + article}],
            model: model,
            response_format: {type: "json_object"}
        });
        return responseCompletion.choices[0].message.content;
    }

    async createAndRunThread(thread: any){
        const run = await openai.beta.threads.createAndRunPoll({
            assistant_id: thread.assistant_id,
            thread: {
                messages: thread.messages
            }
        });
        if (run.status === 'completed') {
            const messages: any = await openai.beta.threads.messages.list(
                run.thread_id
            );
            utils.removeTrash(messages.data[0].content[0].text.value)
            return messages.data[0].content[0].text.value
        } else {
            return run.status
        }
    }
}