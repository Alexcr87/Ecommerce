import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesRepository } from "./file.repository";
import { AuthGuard } from "src/modules/Auth/auth.guard";

@Controller("files")
export class FilesController{
  constructor (private readonly FilesRepository:FilesRepository){}
  
  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() request:Request&{user:any}, @Param('id') id:string , @UploadedFile(
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
   console.log(request.user);
   
    return this.FilesRepository.uploadFile(file, id)
  
  }
}

