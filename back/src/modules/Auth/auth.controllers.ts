import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./loginUser.dto";


@Controller("auth")
export class AuthController{
  constructor(private readonly AuthService: AuthService){}
  
  @Post("signin")
 signin(@Body() user:LoginUserDto){
  
  return this.AuthService.signin(user)
 } 
}