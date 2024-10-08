import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import{Categories} from '../../../modules/Categories/categories.entity'
import { categoriesMock } from "./categories-mock";

@Injectable()
export class CategoriesSeed{
  constructor(@InjectRepository(Categories) private readonly categoryRepository:Repository<Categories>){}

  async seed(){
    try {
      const existingCategories= await this.categoryRepository.find({where:{name: In(categoriesMock)}})

    
    for (const categoryName of categoriesMock) {
      if (!existingCategories.some((Categories)=> Categories.name === categoryName)) {
        const category = new Categories()
        category.name=categoryName
        await this.categoryRepository.save(category)
      }
    }
    } catch (error) {
      throw new InternalServerErrorException(`Error al ejecutar el seeding de Categories: ${error.message}`)
    }
    
  }

}