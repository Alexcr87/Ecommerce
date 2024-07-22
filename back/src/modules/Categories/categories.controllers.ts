import { Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";



@Controller('categories')
export class CategoriesControllers{
  constructor(private readonly categoriesService: CategoriesService){}

  @Post('seeder')
 addCategories(){ return this.categoriesService.addCategories()}

 @Get()
 getCategories(){return this.categoriesService.getCategories()}
   
}