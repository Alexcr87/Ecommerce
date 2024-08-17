import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../modules/Products/products.entity";
import { Repository } from "typeorm";
import { FilesServices } from "./files.service";

@Injectable()
export class FilesRepository{
  constructor(
    @InjectRepository(Product) private productRepository:Repository<Product>,
    private readonly FilesService:FilesServices
  ){}

  async uploadFile(file:Express.Multer.File, id:string){
    const url = await this.FilesService.uploadFile(file)
    await this.productRepository.update(id, {imgUrl:url})
    return {imgUrl:url}
  }

}