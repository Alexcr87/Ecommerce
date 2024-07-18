import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import{v4 as uuid} from 'uuid'


@Entity({name:'porducts'})
export class Product{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid

  @Column({type:'varchar', length:50, nullable: false})
  name: string

  @Column({type:'text', nullable: false})
  description: string

  @Column({type:'decimal', precision:10, scale:2, nullable: false })
  price: number

  @Column({type:'numeric', nullable: false})
  stock: number

  @Column({type:'varchar', default:'../../assets/sinStock.png'})
  imgUrl:string

  // realacion 1 a many con category

  //realcion many a many con orders

}