import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards, ParseUUIDPipe, UseInterceptors, UploadedFile, HttpCode } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { AuthGuard } from "../Auth/auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../decorators/roles.decorators";
import { Rol } from "../Users/roles.enum";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@ApiTags('Products')
@Controller("products")
export class ProductsContoller{
  constructor(private readonly ProductsService:ProductsService){}

  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de página' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de items por página' })
  getProducts(@Query("page") page?:string, @Query("limit") limit?:string){
    if (page||limit) {
      return this.ProductsService.getProductsForPage(Number(page),Number(limit))
    } return  this.ProductsService.getProducts()
  }

  
  @Get(":id")
  @HttpCode(200)
  @ApiParam({name: 'id', required:true, type: UUID, description:'UUID del Producto'})
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
  @Roles(Rol.Admin) 
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  @ApiParam({name: 'id', required:true, type: UUID, description:'UUID del Producto'})
  updateProduct(@Body() product:Product, @Param("id", ParseUUIDPipe) id:string){
    return this.ProductsService.updateProduct(id, product )
  }

  @Delete(":id")
  @HttpCode(200)
  @ApiParam({name: 'id', required:true, type: UUID, description:'UUID del Producto'})
  deleteProduct(@Param("id", ParseUUIDPipe)id:string){
    return  this.ProductsService.deleteProduct(id)
  }

}