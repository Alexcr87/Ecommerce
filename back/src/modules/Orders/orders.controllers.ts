import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthGuard } from "../Auth/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController{
  constructor(private readonly OrdersService:OrdersService){}

  @Get()
  @HttpCode(200)
  getOrders(){
    return this.OrdersService.getOrders()
  }

  @ApiBearerAuth()
  @Get(":id")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getOrdersById(@Param("id", ParseUUIDPipe)id:string){
    return this.OrdersService.getOrdersById(id)
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  addOrders(@Body()Orders:CreateOrderDto){
    return this.OrdersService.addOrders(Orders)
  }


}