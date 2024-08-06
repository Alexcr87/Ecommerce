import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "src/common/cloudinary.service";
import { fileDto } from "./files.dto";

@Injectable()
export class FilesServices{
  constructor(private readonly cloudinaryService:CloudinaryService){}
  
  async uploadFile(file:fileDto){
    return this.cloudinaryService.uploadFile(file.buffer, file.originalname)
  }
}

