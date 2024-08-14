import { ApiProperty } from "@nestjs/swagger"
import { productDto } from "../Products/products.dto"

export class orderDto{
  @ApiProperty()
  userId:string
  @ApiProperty()
  products:productDto[]
}

class productToShowDto{
  name:string
}

export class toShowOrderDto{
  orderId:string
  userId:string
  date: Date
  orderDetailsId: string
  price: number
  products:productToShowDto[]
}