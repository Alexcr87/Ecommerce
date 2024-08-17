import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../Auth/auth.guard";
import { CreateUserDto } from "./createUser.dto";
import { Roles } from "../../decorators/roles.decorators";
import { Rol } from "./roles.enum";
import { RolesGuard } from "../../guards/roles.guard";
import { Request } from "express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller("users")
export class UsersController{
  constructor(private readonly userService:UsersService,

  ){}

  @ApiBearerAuth()
  @Get()
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(200)
  getUsers(){
    return this.userService.getUsers()
  }
  

  @Get('auth0/protected')
  @HttpCode(200)
  getAuth0Protected(@Req()req:Request){
    console.log(req.oidc);
    return JSON.stringify(req.oidc.user)
  }

  @ApiBearerAuth()
  @Get(":id")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserbyId(@Param("id", ParseUUIDPipe) id:string){
    return this.userService.getUserById(id)
  }

  @Post()
  @HttpCode(201)
  createUser(@Body()createUserDto:CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @ApiBearerAuth()
  @Put(":id")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateUser(@Param("id", ParseUUIDPipe) id:string, @Body()createUserDto:CreateUserDto){
    return this.userService.updateUser(id, createUserDto)
  }

  @ApiBearerAuth()
  @Delete(":id")
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteUser(@Param("id", ParseUUIDPipe) id:string){
    return this.userService.deleteUser(id)
  }

  

}