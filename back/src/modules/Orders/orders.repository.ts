import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository{
  constructor (@InjectRepository(Order) private orderRepository:Repository<Order>){}

  async getOrders():Promise<Order[]>{
    return await this.orderRepository.find()
  }

  
}