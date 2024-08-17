import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import{v4 as uuid} from 'uuid'
import { Categories } from "../Categories/categories.entity";
import { OrderDetails } from "../Orders/orderDetails.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name:'products'})
export class Product{
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column({type:'varchar', length:50, nullable: false})
  @ApiProperty({description:'El nombre del usuario, debe tener como mínimo 3 caracteres'})
  name: string

  @Column({type:'text', nullable: false})
  @ApiProperty()
  description: string

  @Column({type:'decimal', precision:10, scale:2, nullable: false })
  @ApiProperty()
  price: number

  @Column({type:'numeric', nullable: false})
  @ApiProperty()
  stock: number

  @Column({type:'varchar', default:'../../assets/sinStock.png'})
  @ApiProperty()
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