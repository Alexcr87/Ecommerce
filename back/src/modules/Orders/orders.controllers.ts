import { Controller, Get, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";


@Controller('orders')
export class OrdersController{
  constructor(private readonly OrdersService:OrdersService){}

  @Get()
  getOrders(){
    return this.OrdersService.getOrders()
  }
}