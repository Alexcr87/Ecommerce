import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Categories } from "../Categories/categories.entity";
import { fileDto } from "src/files/files.dto";
import { FilesServices } from "src/files/files.service";


@Injectable()
export class ProductsRepository{
 
  constructor(
    @InjectRepository(Product) private productRepository:Repository<Product>,
    @InjectRepository(Categories)private categoriesRepository:Repository<Categories>,

){}
  async getProducts():Promise<Product[]>{
    return await this.productRepository.find({relations:['category_id']})
  }

  async getProductById(id:string):Promise<string | Product[]>{
    const product = await this.productRepository.find({where:{id}})
    if (product) {
      return product
    }else{
      return `Producto con id: ${id} no encontrado`
    }
  }

  async findCategoryByName(category:Categories){
    const foundCategory =await this.categoriesRepository.findOne({where:{name:category.id }})
    
    
    if (!foundCategory) {
      throw new Error(`Categoria ${category} no encontrada`)
    }
    return foundCategory
  }

 async createProduct(products:Product):Promise<Product|string>{
  const existingProduct= (await this.productRepository.find()).map((products)=>products.name)
    if (!existingProduct.includes(products.name)) {
      const product= new Product()
      product.name = products.name
      product.description=products.description
      product.price=products.price
      product.stock=products.stock
      product.category_id = await this.findCategoryByName(products.category_id)
      await this.productRepository.save(product)
      return product
    }else{
      return `el porducto con con nombre ${products.name} ya existe`
    }

  }

   async updateProduct(id: string, product: Product):Promise<Product[]|string> {
    const productToUpdate = await this.productRepository.findOne({where: {id}})
    if(productToUpdate){
      Object.assign(productToUpdate, product)
      await this.productRepository.save(productToUpdate)
      return `Producto con id: ${id} modificado con exito ${productToUpdate}`
    } else{

      return `Producto con id: ${id} no encontrado`
    }
  }
  async deleteProduct(id: string):Promise <string> {
     const productToRemove = await this.productRepository.findOneBy({id})
    if(productToRemove){
      await this.productRepository.remove(productToRemove)
      return `Producto con id ${id} eliminado con éxito ${productToRemove}`
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
    const skip =(page -1)*limit
    

    return this.productRepository.find({
      skip,
      take:limit
    })
  }

  /*async uploadFile(file:fileDto, id:string){
    const url = await this.FileService.uploadFile({
      fieldname:file.fieldname,
      buffer:file.buffer,
      originalname:file.originalname,
      mimetype:file.mimetype,
      size:file.size
    })
    await this.productRepository.update(id, {imgUrl:url})
    return {imgUrl:url}
  }*/
}