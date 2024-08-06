import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesRepository } from "./file.repository";

@Controller("files")
export class FilesController{
  constructor (private readonly FilesRepository:FilesRepository){}
  
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') id:string, @UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({
          maxSize: 200000,
          message:'El archivo es demaciado grande debe ser menor a 200kb'
        }),
        new FileTypeValidator({
          fileType:/(jpg|jpeg|png|webp)$/
        })
      ]
    })
  )file:Express.Multer.File){
   return this.FilesRepository.uploadFile(file, id)
  
  }
}

