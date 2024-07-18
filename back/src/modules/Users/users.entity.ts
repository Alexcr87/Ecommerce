import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'


@Entity({name: 'users'})
export class User{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid

  @Column({type: "varchar", length: 50, nullable: false, unique: true})
  email: string

  @Column({type: "varchar", length: 50, nullable: false})
  name: string

  @Column({type: "varchar", length: 20, nullable: false})
  password:string

  @Column({type: "text"})
  address: string

  @Column({type: "int"})
  phone: number

  @Column({type: "varchar", length: 50})
  country: string

  @Column({type: "varchar", length: 50})
  city: string

}