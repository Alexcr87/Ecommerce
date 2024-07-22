import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";


@Injectable()
export class ProductsRepository{
  constructor(@InjectRepository(Product) private productRepository:Repository<Product>){}
  
  async getProducts():Promise<Product[]>{
    return await this.productRepository.find()
  }

  async getProductById(id:string):Promise<string | Product[]>{
    const product = await this.productRepository.find({where:{id}})
    if (product) {
      return product
    }else{
      return `Usuario con id: ${id} no encontrado`
    }
  }

  async createProduct(product:Product[]):Promise<Product[]>{
    return await this.productRepository.save(product)
  }

   async updateProduct(id: string, product: Product):Promise<Product[]|string> {
    const productToUpdate = await this.productRepository.findOne({where: {id}})
    if(productToUpdate){
      console.log("entro al if", productToUpdate);
      console.log("valor nuevo", productToUpdate);
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