import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { CreateUserDto } from "./createUser.dto";



@Injectable()
export class UsersRepository{
  constructor(@InjectRepository(User) private usersRepository:Repository<User>){}

  async getUsers():Promise<User[]>{   
    try {
      return await this.usersRepository.find({relations:{orders:true}})
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener los usuarios:${error.message}`)
    } 
  }

  async getUserById(id:string):Promise<Omit< User, "password">| string>{
    try {
      const user= await this.usersRepository.findOne({
        where: {id},
        relations:{orders:true}
      })
  
      if (user){
        const {password, ...userToShow} =user
        return userToShow
      }
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`)
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el usuario:${id} solicitado:${error.message}`)
    }
    
  }

  async createUser(createUserDto: CreateUserDto):Promise<Omit<User, 'password'>>{
    try {
      const newUser = await this.usersRepository.save(createUserDto)
      const {password, confirmPassword, ...result} = newUser
      return result
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear el usuario:${error.message}`)
    }
    
  }

  async updateUser (id:string, createUserDto:CreateUserDto):Promise<Omit<User, 'password'>>{
    try {
      const userToUpdate = await this.usersRepository.findOne({where: {id}})

      if (userToUpdate) {
        const updatedUser = await this.usersRepository.save({ ...userToUpdate, ...createUserDto })
        const { password, ...userToShow } = updatedUser
        return userToShow
      }else{
        throw new NotFoundException(`Usuario con id: ${id} no encontrado`)
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar el usuario con id:${id} :${error.message}`)
    }
   
  }

  async deleteUser(id:string):Promise<string>{
    try {
      const userToRemove = await this.usersRepository.findOneBy({id})
      if (userToRemove) {
        await this.usersRepository.remove(userToRemove)
        return `Usuario con id: ${id} eliminado con exito`
      } else {
        throw new NotFoundException(`Usuario con id: ${id} no encontrado`)
      }
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el usuario con id: ${id}:${error.message}`)
    }
   
  }

  async findUserByEmail(email: string) {
    try {
      return await this.usersRepository.findOneBy({email})
    } catch (error) {
      throw new InternalServerErrorException(`Error al obtener el email: ${email} :${error.message}`)
    }
  }

}