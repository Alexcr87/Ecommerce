import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { LoginUserDto } from "./loginUser.dto";
import { CreateUserDto } from "../Users/createUser.dto";

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository){}
  signin(user:LoginUserDto){
    return this.authRepository.signin(user)
  }

  signUp(createUser:CreateUserDto){
    return this.authRepository.signUp(createUser)
  }
}