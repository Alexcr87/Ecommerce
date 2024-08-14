import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Categories } from "./categories.entity";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Categories')
@Controller('categories')
export class CategoriesControllers{
  constructor(private readonly categoriesService: CategoriesService){}

  @Post()
 addCategories(@Body()categories:Categories){
   return this.categoriesService.addCategories(categories)}

 @Get()
 getCategories(){return this.categoriesService.getCategories()}
   
}