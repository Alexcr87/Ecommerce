import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description:'El nombre del usuario, debe tener como mínimo 3 caracteres'
  })
  name:string

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:'El email del usuario debe ser un email válido',
    example:'example@gmail.com'
  })
  email:string

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/)
  @ApiProperty({
    description:'La contraseña debe tener entre 8 y 15 caracteres y contoner al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial',
    example:'12345aS@'
  })
  password:string

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/)
  @ApiProperty({
    description:'La contraseña debe tener entre 8 y 15 caracteres y contoner al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial',
    example:'12345aS@'
  })
  confirmPassword:string

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty()
  address:string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  phone:number

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  country: string

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  city:string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description:'Asignada por default al momento de crear el usuario no debe ser incluida',
    default:false
  })
  isAdmin:boolean
}