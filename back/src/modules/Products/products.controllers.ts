import { Body, Controller, Get, Post, Put, Delete, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.interface";


@Controller("products")
export class ProductsContoller{
  constructor(private readonly ProductsService:ProductsService){}

  @Get()
  getProducts(@Query("page") page?:string, @Query("limit") limit?:string){
    if (page||limit) {
      return this.ProductsService.getProductsForPage(Number(page),Number(limit))
    } return  this.ProductsService.getProducts()
  }

  @Get(":id")
  getProductByID(@Param("id") id:string){
    return this.ProductsService.getProductById(Number(id))
  }                                  

  @Post()
  createProduct(@Body () product:Product){ 
    return this.ProductsService.createProduct(product)
  } 

  @Put(":id") 
  updateProduct(@Body() product:Product, @Param("id") id:string){
    return this.ProductsService.updateProduct(Number(id), product )
  }

  @Delete(":id")
  deleteProduct(@Param("id")id:string){
    return  this.ProductsService.deleteProduct(Number(id))
  }
}