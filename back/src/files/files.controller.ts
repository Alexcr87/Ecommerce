import { Controller, Param, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesServices } from "./files.service";

@Controller("files")
export class FilesController{
  constructor (private readonly FilesService:FilesServices){}
  
  @Post("uploadImage/:id")
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile()file:Express.Multer.File){
    return file
  }
}