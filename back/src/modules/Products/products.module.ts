import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsContoller } from "./products.controllers";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers:[ProductsService, ProductsRepository],
  controllers:[ProductsContoller]
})
export class ProductsModule{}