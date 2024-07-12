import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";

@Controller("users")
export class UsersController{
  constructor(private readonly userService:UsersService){}

  @Get()
  getUsers(){
    return this.userService.getUsers()
  }

  @Get(":id")
  getUserbyId(@Param("id") id:string){
    return this.userService.getUserById(Number(id))
  }

  @Post()
  createUser(@Body()user:User){
    return this.userService.createUser(user)
  }

  @Put(":id")
  updateUser(@Param("id") id:string, @Body()user:User){
    return this.userService.updateUser(Number(id), user)
  }


  @Delete(":id")
  deleteUser(@Param("id") id:string){
    return this.userService.deleteUser(Number(id))
  }
}