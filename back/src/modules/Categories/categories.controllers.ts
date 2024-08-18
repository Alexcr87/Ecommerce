import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Categories } from "./categories.entity";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Categories')
@Controller('categories')
export class CategoriesControllers{
  constructor(private readonly categoriesService: CategoriesService){}

 @Post()
 @HttpCode(201)
 addCategories(@Body()categories:Categories){
  return this.categoriesService.addCategories(categories)}

 @Get()
 @HttpCode(200)
 getCategories(){return this.categoriesService.getCategories()}
   
}