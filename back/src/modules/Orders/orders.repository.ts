import { Injectable } from "@nestjs/common";
import { Order } from "./order.entity";

@Injectable()
export class OrdersRepository{
  private  orders:Order[]=[
    {
      id:'',
      user_id:[],
      date:new Date ('2024-07-01T12:00:00Z'),
      orderDetails:[],
  }
]

  async getOrders(){
    return this.orders
  }
}