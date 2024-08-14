import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthGuard } from "../Auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController{
  constructor(private readonly OrdersService:OrdersService){}

  @Get()
  getOrders(){
    return this.OrdersService.getOrders()
  }

  @ApiBearerAuth()
  @Get(":id")
  @UseGuards(AuthGuard)
  getOrdersById(@Param("id", ParseUUIDPipe)id:string){
    return this.OrdersService.getOrdersById(id)
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  addOrders(@Body()Orders:CreateOrderDto){
    return this.OrdersService.addOrders(Orders)
  }


}