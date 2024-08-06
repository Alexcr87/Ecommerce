import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthGuard } from "../Auth/auth.guard";


@Controller('orders')
export class OrdersController{
  constructor(private readonly OrdersService:OrdersService){}

  @Get()
  getOrders(){
    return this.OrdersService.getOrders()
  }
  @Get(":id")
  @UseGuards(AuthGuard)
  getOrdersById(@Param("id", ParseUUIDPipe)id:string){
    return this.OrdersService.getOrdersById(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrders(@Body()Orders:CreateOrderDto){
    return this.OrdersService.addOrders(Orders)
  }


}