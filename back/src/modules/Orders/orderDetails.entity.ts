import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'


@Entity({name:'orderDetails'})
export class OrderDetails{

  @PrimaryGeneratedColumn('uuid')
  id: string =uuid

  @Column({type:'decimal', precision:10, scale:2, nullable: false })
  price: number

  // relacion 1 a 1 con orders

  // realcion many a many con products
}