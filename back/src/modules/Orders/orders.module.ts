import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { OrdersController } from "./orders.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrderDetails } from "./orderDetails.entity";
import { User } from "../Users/users.entity";
import { Product } from "../Products/products.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Order, OrderDetails, User, Product])],
  providers:[OrdersService, OrdersRepository],
  controllers:[OrdersController]
})
export class OrdersModule{}