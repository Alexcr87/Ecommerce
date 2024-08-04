import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { orderDto } from "./orderDto";

@Injectable()
  export class OrdersService{
    constructor(private ordersRepository:OrdersRepository){}
    
    
    addOrders(Orders:orderDto) {
      return this.ordersRepository.addOrders(Orders)
    }
    
    getOrders(){
      return this.ordersRepository.getOrders()
    }
    
    getOrdersById(id: string) {
      return this.ordersRepository.getOrdersById(id)
    }
  }
