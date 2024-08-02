import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository{
  constructor (@InjectRepository(Categories) private categoriesRepository:Repository<Categories>){}

  async getCategories():Promise<Categories[]> {
    return await this.categoriesRepository.find()
  }
  
  async addCategories(categories:Categories[]): Promise<Categories[]|string> {
    for(const category of categories){
      const newCategory=await this.categoriesRepository.findOne({where:{name:category.name}})
    if (!newCategory) {
      return await this.categoriesRepository.save(categories)
    }else {return `categoria con nombre ${category.name} existente`}
    }
    
    
    
    //const newCategory = await this.categoriesRepository.findOne({ where:{name}})
    //if (!newCategory) {
      
    //  return await this.categoriesRepository.save(categories)
    //}else{return `Categoria con nombre ${name} existente`}
  }
  
}