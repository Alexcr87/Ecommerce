import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "../Categories/categories.entity";
import { Product } from "../Products/products.entity";
import { CategoriesSeed } from "./categories/categories.seed";
import { ProductsSeed } from "./products/products,seed";


@Module({
  imports:[TypeOrmModule.forFeature([Categories,Product])],
  providers:[CategoriesSeed, ProductsSeed],
  exports:[CategoriesSeed, ProductsSeed]
})
export class SeedsModule{}