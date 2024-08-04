import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository{
  constructor (@InjectRepository(Categories) private categoriesRepository:Repository<Categories>){}

  async getCategories():Promise<Categories[]> {
    return await this.categoriesRepository.find({relations:['products']})
  }
  
  async addCategories(categories:Categories): Promise<Categories|string> {
      const newCategory=await this.categoriesRepository.findOne({where:{name:categories.name}})
    if (!newCategory) {
      return await this.categoriesRepository.save(categories)
    }else {return `categoria con nombre ${categories.name} existente`}
    
    //const newCategory = await this.categoriesRepository.findOne({ where:{name}})
    //if (!newCategory) {
      
    //  return await this.categoriesRepository.save(categories)
    //}else{return `Categoria con nombre ${name} existente`}
  }
  async findCategoryByName(category:string){
    const foundCategory =await this.categoriesRepository.findOne({where:{name:category }})
    
    
    if (!foundCategory) {
      throw new Error(`Categoria ${category} no encontrada`)
    }
    return foundCategory
  }
}