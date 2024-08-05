import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { productDto } from "../Products/products.dto";

export class CreateOrderDto{
  @IsNotEmpty()
  @IsUUID()
  userId:string
  
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({each:true})
  @Type(()=>productDto)
  products:productDto[]
}