import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Categories } from "../Categories/categories.entity";




@Injectable()
export class ProductsRepository{
 
  constructor(
    @InjectRepository(Product) private productRepository:Repository<Product>,
    @InjectRepository(Categories)private categoriesRepository:Repository<Categories>,

){}

  async getProducts():Promise<Product[]>{
    try {
      return await this.productRepository.find()
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los productos: ${error.message}`)      
    }
  }

  async getProductById(id:string):Promise<Product[]>{
    try {
      const product = await this.productRepository.find({where:{id}})
      if (product) {
        return product
      }else{
        throw new NotFoundException(`Producto con id:${id} no encontrado`)
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException(`Error al obtener producto con id: ${id}: ${error.message}`)
    }
  }

  async findCategoryByName(categoryname:string){
    try {
      const foundCategory =await this.categoriesRepository.findOne({where:{name:categoryname }})
    if (!foundCategory) {
      throw new NotFoundException(`Categoria ${categoryname} no encontrada`)
    }
    return foundCategory
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
     throw new Error(`Error al buscar la categoría con Nombre: ${categoryname}: ${error.message}`) 
    }
    
  }

 async createProduct(products:Product):Promise<Product>{
  try {
  const existingProduct = await this.productRepository.findOne({ where: { name: products.name } })

  if (existingProduct) {
    throw new BadRequestException(`El producto con nombre: ${products.name} ya existe`)
  }
    
  const category = await this.findCategoryByName(products.category as unknown as string)
  if (!category) {
    
  } 
 

  const newProduct = this.productRepository.create({ ...products, category })
  return await this.productRepository.save(newProduct)

  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error
    }
    throw new InternalServerErrorException(`Error al crear el producto: "${error.message}"`)
  }
  
  }

   async updateProduct(id: string, product: Product):Promise<Product> {
    try {
      const productToUpdate = await this.productRepository.findOne({where: {id}})
      if(productToUpdate){
        Object.assign(productToUpdate, product)
        return await this.productRepository.save(productToUpdate)
      } else{
        throw new NotFoundException(`Producto con id: ${id} no encontrado`)
      }  
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException(`Error al actualizar el producto: ${id}: ${error.message}`)
    }
    
  }
  async deleteProduct(id: string):Promise <string> {
    try {
      const productToRemove = await this.productRepository.findOneBy({id})
    if(productToRemove){
      await this.productRepository.remove(productToRemove)
      return `Producto con id ${id} eliminado con éxito ${productToRemove}`
    }else{
      throw new NotFoundException(`Producto no entonrado ${id}`)
    }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException(`Error al eliminar el producto con id: ${id}: ${error.message}`)
    }
     
  }

  getProductsForPage(page: number, limit:number):Promise<Product[]> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener productos por página: ${error.message}`)
    }
  }
}