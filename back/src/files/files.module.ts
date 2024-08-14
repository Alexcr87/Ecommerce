import { Module } from "@nestjs/common";
import { FilesServices } from "./files.service";
import { FilesController } from "./files.controller";
import { CloudinaryService } from "../common/cloudinary.service";
import { FilesRepository } from "./file.repository";
import { ProductsRepository } from "../modules/Products/products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../modules/Products/products.entity";
import { Categories } from "../modules/Categories/categories.entity";


@Module({
  imports:[TypeOrmModule.forFeature([Product, Categories])],
  providers:[FilesServices,CloudinaryService, FilesRepository, ProductsRepository,],
  controllers:[FilesController]
})
export class FilesModule{}