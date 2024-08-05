import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../Users/users.repository";
import { LoginUserDto } from "./loginUser.dto";

@Injectable()
export class AuthRepository{
  constructor (private readonly userRepository:UsersRepository){}
  async signin(user:LoginUserDto):Promise<string>{
    if (!user.email ||!user.password) {
      throw new UnauthorizedException('Email o password incorrectos')
    }

    const login = await this.userRepository.findUserByEmail(user.email)
    
    if (!login|| login.password !== user.password) {   
      throw new UnauthorizedException('Email o password incorrectos')
    }
    return 'Login Exitoso'
  }
}