import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../Auth/auth.guard";
import { CreateUserDto } from "./createUser.dto";
import { Roles } from "../../decorators/roles.decorators";
import { Rol } from "./roles.enum";
import { RolesGuard } from "../../guards/roles.guard";
import { Request } from "express";


@Controller("users")
export class UsersController{
  constructor(private readonly userService:UsersService,

  ){}

  @Get()
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(){
    return this.userService.getUsers()
  }
  

  @Get('auth0/protected')
  getAuth0Protected(@Req()req:Request){
    console.log(req.oidc);
    return JSON.stringify(req.oidc.user)
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  getUserbyId(@Param("id", ParseUUIDPipe) id:string){
    return this.userService.getUserById(id)
  }

  @Post()
  createUser(@Body()createUserDto:CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(@Param("id", ParseUUIDPipe) id:string, @Body()createUserDto:CreateUserDto){
    return this.userService.updateUser(id, createUserDto)
  }


  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id", ParseUUIDPipe) id:string){
    return this.userService.deleteUser(id)
  }

  

}