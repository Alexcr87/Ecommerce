import { BadRequestException, Injectable, InternalServerErrorException} from "@nestjs/common";
import { UsersRepository } from "../Users/users.repository";
import { LoginUserDto } from "./loginUser.dto";
import { CreateUserDto } from "../Users/createUser.dto";
import { User } from "../Users/users.entity";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { Rol } from "../Users/roles.enum";

@Injectable()
export class AuthRepository{
  constructor (
    private readonly userRepository:UsersRepository,
    private readonly jwtService:JwtService

  ){}

  async signin(user:LoginUserDto){
    try {
      if (!user.email ||!user.password) {
        throw new BadRequestException('Los campos Email y Password deben ser completados')
      }
  
      const login = await this.userRepository.findUserByEmail(user.email)
  
      if (!login) {   
        throw new BadRequestException('Email o password incorrectos')
      }
  
      const validPassword = await bcrypt.compare(user.password, login.password)
  
      if (!validPassword) {   
        throw new BadRequestException('Email o password incorrectos')
      }
  
      const userPayload ={
        sub: login.id,
        id:login.id,
        email:login.email,
        roles:[login.isAdmin ? Rol.Admin : false]
      }  
      
      const token = this.jwtService.sign(userPayload)
    
      return { succes: 'Login Exitoso, Tu sesion caducara en 1 hora', token}
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException(`Error en el proceso de inicio de sesión: ${error.message}`)
    }
    
  }

  async signUp(createUser: CreateUserDto):Promise<Omit<User, 'password'>>{

    try {
      const user = await this.userRepository.findUserByEmail(createUser.email)
    if (user) {
      throw new BadRequestException('El email ya se encuentra registrado')
    }
    if (createUser.password !== createUser.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden')
    }

    const hashedPassword = await bcrypt.hash(createUser.password, 10)
    if (!hashedPassword) {
      throw new BadRequestException('La contraseña no fue codificada')
    }
    const newUser = await this.userRepository.createUser({...createUser, password:hashedPassword})
  
    return newUser

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException(`Error al registrar usuario: ${error.message}`)
    }
    
  }
}