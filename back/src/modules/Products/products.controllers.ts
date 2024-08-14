import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards, ParseUUIDPipe, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthGuard } from "../Auth/auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { Roles } from "../../decorators/roles.decorators";
import { Rol } from "../Users/roles.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@Controller("products")
export class ProductsContoller{
  constructor(private readonly ProductsService:ProductsService){}

  @Get()
  getProducts(@Query("page") page?:string, @Query("limit") limit?:string){
    if (page||limit) {
      return this.ProductsService.getProductsForPage(Number(page),Number(limit))
    } return  this.ProductsService.getProducts()
  }

  @ApiBearerAuth()
  @Get(":id")
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getProductByID(@Param("id", ParseUUIDPipe) id:string){
    return this.ProductsService.getProductById(id)
  }                                  

  @Post()
  createProduct(@Body () product:Product){ 
    return this.ProductsService.createProduct(product)
  } 

  @ApiBearerAuth()
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