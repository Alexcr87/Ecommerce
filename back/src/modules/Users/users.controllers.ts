import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.interface";
import { User as UserEntity } from "./users.entity";
import { AuthGuard } from "../Auth/auth.guard";
import { UserDbService } from "./userDb.service";

@Controller("users")
export class UsersController{
  constructor(private readonly userService:UsersService,
    private readonly userDbService: UserDbService
  ){}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(){
    return this.userService.getUsers()
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  getUserbyId(@Param("id") id:string){
    return this.userService.getUserById(Number(id))
  }

  @Post()
  createUser(@Body()user:UserEntity){
    return this.userDbService.saveUser(user)
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  updateUser(@Param("id") id:string, @Body()user:User){
    return this.userService.updateUser(Number(id), user)
  }


  @Delete(":id")
  @UseGuards(AuthGuard)
  deleteUser(@Param("id") id:string){
    return this.userService.deleteUser(Number(id))
  }


  
}