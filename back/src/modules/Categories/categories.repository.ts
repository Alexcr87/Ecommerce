import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository{
  constructor (@InjectRepository(Categories) private categoriesRepository:Repository<Categories>){}

  async getCategories():Promise<Categories[]> {
    try {
      return await this.categoriesRepository.find({relations:['products']})
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener las Categorias: ${error.message}`)
    }
  }
  
  async addCategories(categories:Categories): Promise<Categories|string> {
    try {  
      const newCategory=await this.categoriesRepository.findOne({where:{name:categories.name}})
    if (!newCategory) {
      return await this.categoriesRepository.save(categories)
    }else {
      throw new BadRequestException(`categoria con nombre ${categories.name} existente`)
    }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException(`Error al agregar la Categoria: ${categories}: ${error.message}`)
    }
  }

  async findCategoryByName(category:string){
    try {
      const foundCategory =await this.categoriesRepository.findOne({where:{name:category }})    
      if (!foundCategory) {
        throw new NotFoundException(`Categoria ${category} no encontrada`)
      }
      return foundCategory
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException(`Error al buscar la categoria ${category}: ${error.message}`)
    } 
   
  }
}