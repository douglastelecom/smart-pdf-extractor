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