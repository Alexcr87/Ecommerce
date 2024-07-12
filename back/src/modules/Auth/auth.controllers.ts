import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../Users/user.interface";

@Controller("auth")
export class AuthController{
  constructor(private readonly AuthService: AuthService){}
  
  @Get()
  getAuth(){
    return this.AuthService.getAuth()
  }

  @Post("singin")
  signin(){
    
  }
  
}
  
