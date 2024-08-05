import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "./createOrder.dto";

@Injectable()
  export class OrdersService{
    constructor(private ordersRepository:OrdersRepository){}
    
    
    addOrders(Orders:CreateOrderDto) {
      return this.ordersRepository.addOrders(Orders)
    }
    
    getOrders(){
      return this.ordersRepository.getOrders()
    }
    
    getOrdersById(id: string) {
      return this.ordersRepository.getOrdersById(id)
    }
  }
