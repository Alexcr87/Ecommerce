import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import{v4 as uuid} from 'uuid'
import { Categories } from "../Categories/categories.entity";
import { OrderDetails } from "../Orders/orderDetails.entity";


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

  @ManyToOne(()=>Categories, categories=> categories.poduct)
  categories:Categories

  @ManyToMany(()=>OrderDetails, orderdetails=>orderdetails.products)
  @JoinTable({
    name:'products_orderDetails',
    joinColumn:{name:'product_id', referencedColumnName:'id'},
    inverseJoinColumn:{name:'orderDetails_id', referencedColumnName:'id'}
  })
  orderDetails:OrderDetails[]

}