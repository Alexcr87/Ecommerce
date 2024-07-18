import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'


@Entity({name: 'orders'})
export class Order{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid

  @Column()             //modificar relacion 1 a 1 con User
  user_id: string

  @Column({type:'date'})
  date: Date

  //relacion 1 a 1 con orderDetails
}