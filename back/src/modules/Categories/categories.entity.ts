import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import{v4 as uuid} from 'uuid'
import { Product } from "../Products/products.entity";

@Entity({name: 'categories'})
export class Categories{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid

  @Column({type: 'varchar', length:50, nullable: false})
  name: string

  @OneToMany(()=> Product, product=>product.categories)
  poduct: Product[]
}