import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./createUser.dto";

@Injectable()
export class UsersService{
  constructor(private usersRepository: UsersRepository){}
  getUsers(){
    return  this.usersRepository.getUsers()
  }

  getUserById(id:string){
    return this.usersRepository.getUserById(id)
  }

  updateUser(id:string, createUserDto:CreateUserDto){
    return this.usersRepository.updateUser(id, createUserDto)
  }

  deleteUser(id:string){
    return this.usersRepository.deleteUser(id)
  }
  
}