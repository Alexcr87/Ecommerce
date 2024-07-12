import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsContoller } from "./products.controllers";
import { ProductsRepository } from "./products.repository";

@Module({
  providers:[ProductsService, ProductsRepository],
  controllers:[ProductsContoller]
})
export class ProductsModule{}