import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards, ParseUUIDPipe, UseInterceptors, UploadedFile, HttpCode } from "@nestjs/common";
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
  @HttpCode(200)
  getProducts(@Query("page") page?:string, @Query("limit") limit?:string){
    if (page||limit) {
      return this.ProductsService.getProductsForPage(Number(page),Number(limit))
    } return  this.ProductsService.getProducts()
  }

  @ApiBearerAuth()
  @Get(":id")
  //@Roles(Rol.Admin)
  //@UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getProductByID(@Param("id", ParseUUIDPipe) id:string){
    return this.ProductsService.getProductById(id)
  }                                  

  @Post()
  @HttpCode(201)
  createProduct(@Body () product:Product){ 
    return this.ProductsService.createProduct(product)
  } 

  @ApiBearerAuth()
  @Put(":id") 
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateProduct(@Body() product:Product, @Param("id", ParseUUIDPipe) id:string){
    return this.ProductsService.updateProduct(id, product )
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  deleteProduct(@Param("id", ParseUUIDPipe)id:string){
    return  this.ProductsService.deleteProduct(id)
  }

}