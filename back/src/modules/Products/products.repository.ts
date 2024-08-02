import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Categories } from "../Categories/categories.entity";


@Injectable()
export class ProductsRepository{
  constructor(
    @InjectRepository(Product) private productRepository:Repository<Product>,
    @InjectRepository(Categories)private categoriesRepository:Repository<Categories>
){}
  async getProducts():Promise<Product[]>{
    return await this.productRepository.find()
  }

  async getProductById(id:string):Promise<string | Product[]>{
    const product = await this.productRepository.find({where:{id}})
    if (product) {
      return product
    }else{
      return `Producto con id: ${id} no encontrado`
    }
  }

 /* async createProduct(products:Product[]):Promise<Product[]|string>{
    
    for (const product of products) {
      let category = await this.categoriesRepository.findOne({where:{name:product.category}})
      if (!category) {
        const newCategory = this.categoriesRepository.create({
          name:product.category,
          products:[product.name],
        })
        await this.categoriesRepository.create
      }else{
        const newProduct =await this.productRepository.findOne({where:{name:product.name}})
        if (!newProduct) {
          await this.productRepository.create
        }
      }
    }
    
  }*/

   async updateProduct(id: string, product: Product):Promise<Product[]|string> {
    const productToUpdate = await this.productRepository.findOne({where: {id}})
    if(productToUpdate){
      Object.assign(productToUpdate, product)
      await this.productRepository.save(productToUpdate)
      return `Producto con id: ${id} modificado con exito ${productToUpdate}`
    } else{

      return `Producto con id: ${id} no encontrado`
    }
  }
  async deleteProduct(id: string):Promise <string> {
     const productToRemove = await this.productRepository.findOneBy({id})
    if(productToRemove){
      await this.productRepository.remove(productToRemove)
      return `Producto con id ${id} eliminado con éxito ${productToRemove}`
    }else{
      return `Producto no entonrado ${id}` 
    }
  }

  getProductsForPage(page: number, limit:number) {
    if(isNaN(page)){
      page = 1
    }
    if(isNaN(limit)||(!limit)){
      limit = 5
    } 
    const skip =(page -1)*limit
    

    return this.productRepository.find({
      skip,
      take:limit
    })
  }
}