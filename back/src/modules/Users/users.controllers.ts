import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { AuthGuard } from "../Auth/auth.guard";


@Controller("users")
export class UsersController{
  constructor(private readonly userService:UsersService,

  ){}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(){
    return this.userService.getUsers()
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  getUserbyId(@Param("id") id:string){
    return this.userService.getUserById(id)
  }

  @Post()
  createUser(@Body()user:User[]){
    return this.userService.createUser(user)
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(@Param("id") id:string, @Body()user:User){
    return this.userService.updateUser(id, user)
  }


  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id") id:string){
    return this.userService.deleteUser(id)
  }


  
}