import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "./product.interface";

@Injectable()
export class ProductsService{
  
  constructor(private productRepository: ProductsRepository){}
  getProducts(){
    return this.productRepository.getProducts()
  }
  
  getProductById(id:number){
    return this.productRepository.getProductById(id)
  }
  
  createProduct(product:Omit<Product, "id">):Promise <Product>{
    return this.productRepository.createProduct(product)
  }
  
  deleteProduct(id: number) {
    return this.productRepository.deleteProduct(id)
  }
  updateProduct(id:number, product: Product) {
    return this.productRepository.updateProduct(id, product)
    
  }

  getProductsForPage(page: number, limit:number) {
    return this.productRepository.getProductsForPage(page, limit)
  }
}