import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UserDbService{
  constructor(@InjectRepository(User) private usersRepository:Repository<User>){}

  saveUser(user:User){
    this.usersRepository.save(user)
  }


}