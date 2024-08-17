import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import{Categories} from '../../../modules/Categories/categories.entity'
import { Product } from "../../../modules/Products/products.entity";
import { Repository } from "typeorm";
import { productsMock } from "./products-mock";


@Injectable()
export class ProductsSeed{
  constructor(
    @InjectRepository(Product)private readonly productRepository:Repository<Product>,
    @InjectRepository(Categories) private readonly categoriesRepository:Repository<Categories>
) {}

async findCategoryByName(category:string){
  const foundCategory =await this.categoriesRepository.findOne({where:{name:category }})
  
  
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
      product.category = await this.findCategoryByName(productData.category)
      await this.productRepository.save(product)
    }
    
  }
}

}