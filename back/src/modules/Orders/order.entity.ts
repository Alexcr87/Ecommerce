import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "../Users/users.entity";
import { OrderDetails } from "./orderDetails.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";


@Entity({name: 'orders'})
export class Order{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @ManyToOne(()=> User, (user)=> user.orders)
  @JoinColumn({name: 'user_id'})
  @ApiProperty()
  user: User

  @Column({type:'date'})
  @IsDate()
  @ApiProperty({description:'Fecha en formato YYYY/MM/DD'})
  date: Date

  @OneToOne(()=> OrderDetails, orderDetails=>orderDetails.order)
  @ApiProperty()
  orderDetails: OrderDetails
}