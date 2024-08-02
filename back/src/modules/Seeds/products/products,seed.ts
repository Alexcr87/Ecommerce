import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/modules/Categories/categories.entity";
import { Product } from "src/modules/Products/products.entity";
import { In, Repository } from "typeorm";
import { productsMock } from "./products-mock";
import { categoriesMock } from "../categories/categories-mock";

@Injectable()
export class ProductsSeed{
  constructor(
    @InjectRepository(Product)private readonly productRepository:Repository<Product>,
    @InjectRepository(Categories) private readonly CategoriesRepository:Repository<Categories>
) {}

async findCategoryByName(category:string){
  const foundCategory =await this.CategoriesRepository.findOne({where:{name:In(categoriesMock) }})
  if (!foundCategory) {
    throw new Error(`Categoria ${category} no encontrada`)
  }
  return foundCategory
}

async seed (){
  const existingProduct= (await this.productRepository.find()).map((product)=>product.name)
  for (const productData of productsMock) {
    if (!existingProduct.includes(productData.name)) {
      const product= new Product()
      product.name = productData.name
      product.description=productData.description
      product.price=productData.price
      product.stock=productData.stock
      const asignCategory = await this.findCategoryByName(productData.category)
      product.category_id= asignCategory
      console.log(product);
      
      await this.productRepository.save(product)
    }
    
  }
}

}