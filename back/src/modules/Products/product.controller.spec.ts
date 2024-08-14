import { Test } from "@nestjs/testing"
import { ProductsContoller } from "./products.controllers"
import { AuthGuard } from "../Auth/auth.guard"
import * as jwt from 'jsonwebtoken'
import { JwtService } from "@nestjs/jwt"
import { ProductsService } from "./products.service"
import { Product } from "./products.entity"

describe('ProductController', ()=>{
  let productController:ProductsContoller
  let mockAuthGuard:Partial<AuthGuard>
  let mockProductService: Partial<ProductsService>

  const mockProduct: Partial<Product> ={
    name: 'product',
    description: 'es una descipcion'
  }

  beforeEach(async ()=>{
    mockProductService={
      getProducts:()=> Promise.resolve([
        {
          ...mockProduct,
          id: "6bf02ba5-06b0-4dc6-af8d-ab1441e9a189",
          stock: 12,
        }as Product ]),
    }
    const mockJwtService = {
      sign:(payload)=> jwt.sign(payload, 'testSecret')
    }
    const module = await Test.createTestingModule({
      controllers:[ProductsContoller],
      providers:[{
        provide: AuthGuard, useValue:mockAuthGuard},
        {provide: ProductsService, useValue:mockProductService,
      },
      {
        provide: JwtService, 
        useValue: mockJwtService
      },]
    }).compile()
    productController = module.get<ProductsContoller>(ProductsContoller)
  })

  it('should be defined', ()=>{
    expect (productController).toBeDefined()
  })
  it('getProducts() should return an array of Product', async ()=>{
    const product = await productController.getProducts()
    expect(product).toEqual([{
      id: "6bf02ba5-06b0-4dc6-af8d-ab1441e9a189",
      name: 'product',
      description: 'es una descipcion',
      stock: 12,
    }])
    
  })
})