import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CloudinaryService } from "src/common/cloudinary.service";
import { Product } from "src/modules/Products/products.entity";
import { Repository } from "typeorm";
import { fileDto } from "./files.dto";
import { FilesServices } from "./files.service";

@Injectable()
export class FilesRepository{
  constructor(
    @InjectRepository(Product) private productRepository:Repository<Product>,
    private readonly FilesService:FilesServices
  ){}

  async uploadFile(file:fileDto, id:string){
    const url = await this.FilesService.uploadFile({
      fieldname:file.fieldname,
      buffer:file.buffer,
      originalname:file.originalname,
      mimetype:file.mimetype,
      size:file.size
    }) 
    await this.productRepository.update(id, {imgUrl:url})
    return {imgUrl:url}
  }

}