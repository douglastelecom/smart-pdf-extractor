export class Utils{
    removeTrash(jsonString: string){
        jsonString = jsonString.replace("```json","").replace("```","")
        console.log(jsonString)
    }
}