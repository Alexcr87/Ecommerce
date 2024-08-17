import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "../common/cloudinary.service";


@Injectable()
export class FilesServices{
  constructor(private readonly cloudinaryService:CloudinaryService){}
  
  async uploadFile(file:Express.Multer.File){
    return this.cloudinaryService.uploadFile(file.buffer, file.originalname)
  }
}

