import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./loginUser.dto";
import { CreateUserDto } from "../Users/createUser.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller("auth")
export class AuthController{
  constructor(private readonly AuthService: AuthService){}
  
  @Post("signin")
 signin(@Body() user:LoginUserDto){
  
  return this.AuthService.signin(user)
 } 

 @Post("signup")
 signUp(@Body() createUser:CreateUserDto){
  return this.AuthService.signUp(createUser)
 }
}