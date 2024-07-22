import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { OrdersController } from "./orders.controllers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Order])],
  providers:[OrdersService, OrdersRepository],
  controllers:[OrdersController]
})
export class OrdersModule{}