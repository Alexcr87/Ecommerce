import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { orderDto } from "./orderDto";


@Controller('orders')
export class OrdersController{
  constructor(private readonly OrdersService:OrdersService){}

  @Get()
  getOrders(){
    return this.OrdersService.getOrders()
  }
  @Get(":id")
  getOrdersById(@Param("id")id:string){
    return this.OrdersService.getOrdersById(id)
  }

  @Post()
  addOrders(@Body()Orders:orderDto){
    return this.OrdersService.addOrders(Orders)
  }


}