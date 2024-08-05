import { IsUUID } from "class-validator";


export class productDto{
  @IsUUID()
 id:string
}