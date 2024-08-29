import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { In, Repository } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { User } from "../Users/users.entity";
import { Product } from "../Products/products.entity";
import { toShowOrderDto } from "./order.dto";
import { CreateOrderDto } from "./createOrder.dto";

@Injectable()
export class OrdersRepository{
  constructor (
    @InjectRepository(Order) private orderRepository:Repository<Order>,
    @InjectRepository(OrderDetails) private orderDetailsRepository:Repository<OrderDetails>,
    @InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Product) private productRepository:Repository<Product>
  ){}
  
  async addOrders(Orders: CreateOrderDto): Promise<toShowOrderDto> {

    try {
      const foundUser = await this.userRepository.findOne({ where: { id: Orders.userId } })
    if (!foundUser) {
      throw new NotFoundException(`Usuario con id ${Orders.userId} no encontrado`)
    }
  
    const productIds = Orders.products.map(obj => obj.id)
    const existingProducts = await this.productRepository.findBy({ id: In(productIds) })

    if(existingProducts.length !== Orders.products.length){
      throw new BadRequestException(`Algunos productos no fueron encontrados`)
    }
    
    for (const product of existingProducts) {
      const orderProduct = Orders.products.find(p => p.id === product.id);
      if (product.stock < 1) {
        throw new BadRequestException(`El producto ${product.name} no tiene stock suficiente`);
      }}

    const newOrder = this.orderRepository.create({
      user: foundUser,
      date: new Date()
    })
  
    await this.orderRepository.save(newOrder)
  
    const totalPrice = existingProducts.reduce((acc, product) => {
      product.stock -= 1
      this.productRepository.save(product)
      return acc + parseFloat(product.price.toString())
    }, 0)
  
    const newOrderDetails = this.orderDetailsRepository.create({
      order: newOrder,
      products: existingProducts,
      price: totalPrice
    })
  
    await this.orderDetailsRepository.save(newOrderDetails)
  
    return {
      orderId: newOrder.id,
      userId: foundUser.id,
      date: newOrder.date,
      orderDetailsId: newOrderDetails.id,
      price: newOrderDetails.price,
      products: existingProducts.map(product => ({ name: product.name }))
    }
    } catch (error) {
      throw new InternalServerErrorException(`Error al agregar las Ordenes:${error.message}`)
    }
    
  }
  
  async getOrders():Promise<Order[]>{
    try {
      return await this.orderRepository.find()
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener las Ordenes: ${error.message}`)
    }
  }
  async getOrdersById(id: string) {
    try {
      const order = await this.orderRepository.findOne({
        where:{id},
        relations:['orderDetails','orderDetails.products']
      })
      if (order) {
        return order
      }else{
       throw new NotFoundException (`Orden con id: ${id} no encontrado`)
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener la Ordenes con id: ${id}: ${error.message}`)
    }
   
  }
  
}