import { Column, Entity, JoinColumn, ManyToMany, NumericType, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Order } from "./order.entity";
import { Product } from "../Products/products.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


@Entity({name:'orderDetails'})
export class OrderDetails{

  @PrimaryGeneratedColumn('uuid')
  id: string =uuid()

  @Column({type:'decimal', precision:10, scale:2, nullable: false })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Precio del producto en decimal',
    example:99.99})
  price: number

  @OneToOne(()=>Order,  order => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  @ApiProperty()
  order: Order

  @ManyToMany(()=>Product, product=>product.orderDetails)
  @ApiProperty()
  products:Product[]
}