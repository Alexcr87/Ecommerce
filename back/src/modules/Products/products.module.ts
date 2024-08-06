import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsContoller } from "./products.controllers";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Categories } from "../Categories/categories.entity";
import { FilesModule } from "src/files/files.module";
import { FilesServices } from "src/files/files.service";
import { CloudinaryService } from "src/common/cloudinary.service";



@Module({
  imports: [TypeOrmModule.forFeature([Product, Categories])],
  providers:[ProductsService, ProductsRepository],
  controllers:[ProductsContoller]
})
export class ProductsModule{}