import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { CreateUserDto } from "./createUser.dto";


@Injectable()
export class UsersRepository{
  constructor(@InjectRepository(User) private usersRepository:Repository<User>){}
  async getUsers():Promise<User[]>{   
    return await this.usersRepository.find({relations:{orders:true}})
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

  async createUser(createUserDto: CreateUserDto):Promise<User>{
    const newUser=new User()
    newUser.email=createUserDto.email
    newUser.address =createUserDto.address
    newUser.city =createUserDto.city
    newUser.country=createUserDto.country
    newUser.name=createUserDto.name
    newUser.password=createUserDto.password
    newUser.phone =createUserDto.phone

    return await this.usersRepository.save(newUser)
  }

  async updateUser (id:string, createUserDto:CreateUserDto):Promise<User[]|string>{
    const userToUpdate = await this.usersRepository.findOne({
      where: {id}
    })
    if (userToUpdate) {
      Object.assign(userToUpdate, createUserDto)
      await this.usersRepository.save(userToUpdate)
      return `Usuario con id: ${id} modificado con exito ${userToUpdate}`
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
    const user = await this.usersRepository.findOneBy({email})
    return user
  }

}