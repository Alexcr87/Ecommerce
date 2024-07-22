import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

@Injectable()
export class UsersRepository{
  constructor(@InjectRepository(User) private usersRepository:Repository<User>){}
  async getUsers():Promise<User[]>{   
    const users = await this.usersRepository.find()
    return users
  }

  async getUserById(id:string):Promise<Omit< User, "password">| string>{
    const user= await this.usersRepository.findOne({
      where: {id}
    })
    if (user){
      const {password, ...userToShow} =user
      return userToShow
    }
    return `Usuario con id: ${id} no encontrado`
  }

  async createUser(user: User[]):Promise<User[]>{
    return await this.usersRepository.save(user)
   
  }

  async updateUser (id:string, user:User):Promise<User[]|string>{
    const userToUpdate = await this.usersRepository.findOne({
      where: {id}
    })
    if (userToUpdate) {
      Object.assign(userToUpdate, user)
      await this.usersRepository.save(userToUpdate)
      return `Usuario con id: ${id} modificado con exito${userToUpdate}`
    }else{
      return `Usuario con id: ${id} no encontrado`
    }
  }

  async deleteUser(id:string):Promise<string>{
    const userToRemove = await this.usersRepository.findOneBy({id})
    if (userToRemove) {
      await this.usersRepository.remove(userToRemove)
      return `Usuario con id: ${id} eliminado con exito`
    } else {return `Usuario con id: ${id} no encontrado`}
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({email});
    return user;
  }

}