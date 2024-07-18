import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../Users/users.repository";

@Injectable()
export class AuthRepository{
  constructor (private readonly userRepository:UsersRepository){}
  async signin(email, password){
    if (!email ||!password) {
      throw new UnauthorizedException('Email o password incorrectos')
      
    }

    const user = await this.userRepository.findUserByEmail(email)
    
    if (!user|| user.password !== password) {   
      throw new UnauthorizedException('Email o password incorrectos')
    }
    return {message: 'login exitoso', user}
  }
}