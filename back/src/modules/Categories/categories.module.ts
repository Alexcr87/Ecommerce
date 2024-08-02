import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesControllers } from "./categories.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Categories]),],
  providers:[CategoriesService, CategoriesRepository],
  controllers:[CategoriesControllers],
})
export class CategoriesModule{}