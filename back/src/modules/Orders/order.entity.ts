import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "../Users/users.entity";
import { OrderDetails } from "./orderDetails.entity";


@Entity({name: 'orders'})
export class Order{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @ManyToOne(()=> User, (user)=> user.orders)
  @JoinColumn({name: 'user_id'})
  user: User

  @Column({type:'date'})
  date: Date

  @OneToOne(()=> OrderDetails, orderDetails=>orderDetails.order)
  orderDetails: OrderDetails[]
}