import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { AuthGuard } from "../Auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./createUser.dto";


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