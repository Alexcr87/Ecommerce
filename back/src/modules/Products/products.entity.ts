import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import{v4 as uuid} from 'uuid'
import { Categories } from "../Categories/categories.entity";
import { OrderDetails } from "../Orders/orderDetails.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


@Entity({name:'products'})
export class Product{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column({type:'varchar', length:50, nullable: false})
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  @ApiProperty({description:'El nombre del producto, debe tener como máximo 50 caracteres'})
  name: string

  @Column({type:'text', nullable: false})
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example:'Una breve descrición del producto'})
  description: string

  @Column({type:'decimal', precision:10, scale:2, nullable: false })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Precio del producto en decimal',
    example:99.99})
  price: number

  @Column({type:'numeric', nullable: false})
  @IsNumber()
  @ApiProperty({
    description:'Cantidad de stock',
    example:99})
  stock: number

  @Column({type:'varchar', default:'https://res.cloudinary.com/dkuxl5rdo/image/upload/v1722894656/upload/sinStock.png.png'})
  @ApiProperty({description: 'Url de la Imagen',
    example:'https://res.cloudinary.com/dkuxl5rdo/image/upload/v1722894656/upload/sinStock.png.png'
  })
  imgUrl:string

  @ManyToOne(()=>Categories, category=> category.products,{eager:true})
  @JoinColumn({name:'category_id'})
  @ApiProperty({description:'La categoria debe ser un id en formato UUID'})
  category:Categories

  @ManyToMany(()=>OrderDetails, orderdetails=>orderdetails.products)
  @JoinTable({
    name:'products_orderDetails',
    joinColumn:{name:'product_id', referencedColumnName:'id'},
    inverseJoinColumn:{name:'orderDetails_id', referencedColumnName:'id'}
  })
  orderDetails:OrderDetails[]

}