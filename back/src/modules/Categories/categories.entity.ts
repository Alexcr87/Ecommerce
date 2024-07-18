import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import{v4 as uuid} from 'uuid'

@Entity({name: 'categories'})
export class Categories{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid

  @Column({type: 'varchar', length:50, nullable: false})
  name: string

  // relacion 1 a 1 con products
}