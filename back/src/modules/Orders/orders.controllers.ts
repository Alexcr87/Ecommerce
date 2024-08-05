import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";


@Controller('orders')
export class OrdersController{
  constructor(private readonly OrdersService:OrdersService){}

  @Get()
  getOrders(){
    return this.OrdersService.getOrders()
  }
  @Get(":id")
  getOrdersById(@Param("id", ParseUUIDPipe)id:string){
    return this.OrdersService.getOrdersById(id)
  }

  @Post()
  addOrders(@Body()Orders:CreateOrderDto){
    return this.OrdersService.addOrders(Orders)
  }


}