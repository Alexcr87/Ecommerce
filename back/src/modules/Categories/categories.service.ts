import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { Categories } from "./categories.entity";

@Injectable()
export class CategoriesService{
 
  constructor(private categoriesRepository: CategoriesRepository){}

  getCategories(){
    return this.categoriesRepository.getCategories()
  }
  
  addCategories(categories:Categories[]) {
    return this.categoriesRepository.addCategories(categories)
  }
}
