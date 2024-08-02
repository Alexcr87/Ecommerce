import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.entity";

@Injectable()
export class ProductsService{
  
  constructor(private productRepository: ProductsRepository){}
  getProducts(){
    return this.productRepository.getProducts()
  }
  
  getProductById(id:string){
    return this.productRepository.getProductById(id)
  }
  
  createProduct(product:Product[]){
    //return this.productRepository.createProduct(product)
  }
  
  deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id)
  }
  updateProduct(id:string, product: Product) {
    return this.productRepository.updateProduct(id, product)
    
  }

  getProductsForPage(page: number, limit:number) {
    return this.productRepository.getProductsForPage(page, limit)
  }
}