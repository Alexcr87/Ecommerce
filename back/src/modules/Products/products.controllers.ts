import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards, ParseUUIDPipe, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthGuard } from "../Auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";


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
  getProductByID(@Param("id", ParseUUIDPipe) id:string){
    return this.ProductsService.getProductById(id)
  }                                  

  @Post()
  createProduct(@Body () product:Product){ 
    return this.ProductsService.createProduct(product)
  } 

  @Put(":id") 
  @UseGuards(AuthGuard)
  updateProduct(@Body() product:Product, @Param("id", ParseUUIDPipe) id:string){
    return this.ProductsService.updateProduct(id, product )
  }

  @Delete(":id")
  deleteProduct(@Param("id", ParseUUIDPipe)id:string){
    return  this.ProductsService.deleteProduct(id)
  }

}