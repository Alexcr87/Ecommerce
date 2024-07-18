import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController{
  constructor(private readonly AuthService: AuthService){}
  
  @Post("signin")
 signin(@Body() body: {email: string, password:string}){
  const {email, password} = body
  return this.AuthService.signin(email, password)
 } 
}