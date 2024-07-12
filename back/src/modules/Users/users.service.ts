import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.interface";

@Injectable()
export class UsersService{
  constructor(private usersRepository: UsersRepository){}
  getUsers(){return  this.usersRepository.getUsers()}

  getUserById(id:number){
    return this.usersRepository.getUserById(id)
  }

  createUser(user:Omit<User, "id">){
    return this.usersRepository.createUser(user)
  }

  updateUser(id:number, user:User){
    return this.usersRepository.updateUser(id, user)
  }

  deleteUser(id:number){
    return this.usersRepository.deleteUser(id)
  }

}