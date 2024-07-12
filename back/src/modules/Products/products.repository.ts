import { Injectable } from "@nestjs/common";
import { Product } from "./product.interface";
import { filter } from "rxjs";

@Injectable()
export class ProductsRepository{
  
  
  private products:Product [] = [
    {
      id: 1,
      name: "resmas A4",
      description: "Caja por 10 unidades, Marca Autor",
      price: 999.99,
      stock: 1000,
      imgUrl:"",
    },
    {
      id: 2,
      name: "resmas Oficio",
      description: "Caja por 10 unidades, Marca Autor",
      price: 1999.99,
      stock: 1500,
      imgUrl:"",
    },
    {
      id: 3,
      name: "resmas Biblioratos",
      description: "Tamaño Oficio, Marca Pepito",
      price: 2999.99,
      stock: 1800,
      imgUrl:"",
    },
  ]
  async getProducts(){
    return this.products
  }

  async getProductById(id){
    return this.products.find((products)=>products.id ===id)
  }

  async createProduct(product:Omit<Product, "id">){
    const id = this.products.length +1
    this.products = [... this.products,{id, ...product}]
    return {id, ...product}
  }

   async updateProduct(id: number, product: Product) {
    const productToUpdate = this.products.find((product)=>product.id===id)
    if(productToUpdate){
      Object.assign(productToUpdate, product)
      return {message:`Producto con id: ${id} modificado con exito`,product: productToUpdate}
    } else{
      return `Producto con id: ${id} no encontrado`
    }
  }
  async deleteProduct(id: number) {
     const productToRemove = this.products.find((products) => products.id ===id)
    if(productToRemove){
      this.products =this.products.filter((products)=> products.id !== id)
      return {message:`Producto con id ${id} eliminado con éxito`,products:this.products}
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
    const startIndex =(page -1)*limit
    const endIndex =startIndex+limit

    return this.products.slice(startIndex, endIndex)
  }
}