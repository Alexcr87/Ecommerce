import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import{v4 as uuid} from 'uuid'
import { Product } from "../Products/products.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@Entity({name: 'categories'})
export class Categories{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column({type: 'varchar', length:50, nullable: false})
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({description:'El nombre de la categoria, debe tener como máximo 50 caracteres'})
  name: string

  @OneToMany(()=> Product, product=>product.category)
  @ApiProperty()
  products: Product[]
}