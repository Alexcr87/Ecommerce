import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto{
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({
    description:'El email del usuario debe ser un email válido',
    example:'example@mail.com'
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
}