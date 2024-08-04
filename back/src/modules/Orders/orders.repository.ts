import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { In, Repository } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { User } from "../Users/users.entity";
import { Product } from "../Products/products.entity";
import { orderDto, toShowOrderDto } from "./orderDto";

@Injectable()
export class OrdersRepository{
  constructor (
    @InjectRepository(Order) private orderRepository:Repository<Order>,
    @InjectRepository(OrderDetails) private orderDetailsRepository:Repository<OrderDetails>,
    @InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Product) private productRepository:Repository<Product>
  ){}
  
  async addOrders(Orders:orderDto):Promise<toShowOrderDto>{
    const foundUser = await this.userRepository.findOne({where:{id:Orders.userId}})
    if (!foundUser) {
      throw new Error(`Usuario con id ${Orders.userId} no encontrado`)
    }else{
      const productIds = Orders.products.map(obj => obj.id)
      const existingProducts = await this.productRepository.findBy({ id: In(productIds) })
      const newOrderDetails = new OrderDetails()
      const newOrder=new Order()
      newOrder.user= foundUser
      newOrder.date = new Date()
      this.orderRepository.save(newOrder)
      newOrderDetails.order = newOrder
      newOrderDetails.products = existingProducts
      const totalPrice = existingProducts.reduce((acc, product) => {
        const productPrice = parseFloat(product.price.toString())
        return acc + productPrice
      }, 0)
      newOrderDetails.price = totalPrice;
      for (const product of existingProducts) {
        product.stock = product.stock -1
        console.log(product, "stock");
        await this.productRepository.save(product)
      }
      
      await this.orderDetailsRepository.save(newOrderDetails)
      return {
        orderId: newOrder.id,
        userId: foundUser.id,
        date: newOrder.date,
        orderDetailsId: newOrderDetails.id,
        price: newOrderDetails.price,
        products: existingProducts.map(product => ({ name: product.name }))
      }
    }
    
  }
  
  async getOrders():Promise<Order[]>{
    return await this.orderRepository.find()
  }
  async getOrdersById(id: string) {
    const order = await this.orderRepository.findOne({
      where:{id},
      relations:['orderDetails','orderDetails.products']
    })
    if (order) {
      return order
    }else{
      return `Orden con id: ${id} no encontrado`
    }
  }
  
}