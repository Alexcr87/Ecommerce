import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name:string

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email:string

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/)
  password:string

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/)
  confirmPassword:string

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address:string

  @IsNumber()
  @IsNotEmpty()
  phone:number

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city:string

  @IsBoolean()
  @IsOptional()
  isAdmin:boolean
}