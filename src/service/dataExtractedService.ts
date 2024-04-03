import prismaClient from "prisma";

class DataExtractedService{
    async createDataExtracted(project: string){
      const dataExtracted = await prismaClient.dataExtracted.create({
        data:{
            project 
        }
      })
      return dataExtracted
    }
}

export {DataExtractedService}