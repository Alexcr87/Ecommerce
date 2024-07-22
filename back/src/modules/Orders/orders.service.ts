import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";

@Injectable()
  export class OrdersService{
    constructor(private ordersRepository:OrdersRepository){}

    getOrders(){
      return this.ordersRepository.getOrders()
    }

  }
