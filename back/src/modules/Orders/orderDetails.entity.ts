import { Column, Entity, JoinColumn, ManyToMany, NumericType, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Order } from "./order.entity";
import { Product } from "../Products/products.entity";


@Entity({name:'orderDetails'})
export class OrderDetails{

  @PrimaryGeneratedColumn('uuid')
  id: string =uuid()

  @Column({type:'decimal', precision:10, scale:2, nullable: false })
  price: number

  @OneToOne(()=>Order,  order => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToMany(()=>Product, product=>product.orderDetails)
  products:Product[]
}