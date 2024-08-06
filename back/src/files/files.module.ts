import { Module } from "@nestjs/common";
import { FilesServices } from "./files.service";
import { FilesController } from "./files.controller";
import { CloudinaryService } from "src/common/cloudinary.service";
import { FilesRepository } from "./file.repository";
import { ProductsRepository } from "src/modules/Products/products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/modules/Products/products.entity";
import { Categories } from "src/modules/Categories/categories.entity";


@Module({
  imports:[TypeOrmModule.forFeature([Product, Categories])],
  providers:[FilesServices,CloudinaryService, FilesRepository, ProductsRepository,],
  controllers:[FilesController]
})
export class FilesModule{}