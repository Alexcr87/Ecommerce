import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";

@Injectable()
export class UsersRepository{
  private users =[
    {
      id: 1,
      email: "chrsistian@mail.com",
      name: "christian",
      password:"1",
      address: "Calle falsa 123",
      phone: "00000000",
      country: "Argentina",
      city: "Santos Lugares"
    },
    {
      id: 2,
      email: "yesi@mail.com",
      name: "yesi",
      password:"2",
      address: "Calle falsa 123",
      phone: "11111111",
      country: "Argentina",
      city: "Santos Lugares"
    },
    {
      id: 3,
      email: "valen@mail.com",
      name: "valen",
      password:"3",
      address: "Calle falsa 123",
      phone: "22222222",
      country: "Argentina",
      city: "Mariano Acosta"
    },
  ]
  async getUsers(){
    return this.users
  }

  async getUserById(id:number){
    return this.users.find((user)=>user.id ===id)
  }

  async createUser(user: Omit<User, "id">){
    const id = this.users.length +1
    this.users = [... this.users,{id, ...user}]
    return {id,...user}
  }

  async updateUser (id:number, user:User){
    const userToUpdate = this.users.find((user)=>user.id ===id)
    if (userToUpdate) {
      Object.assign(userToUpdate, user)
      return {message:`Usuario modificado con id: ${id} modificado con exito`,user:userToUpdate}
    }else{
      return `Usuario con id: ${id} no encontrado`
    }
  }

  async deleteUser(id:number){
    const userToRemove = this.users.find((user)=> user.id ===id)
    if (userToRemove) {
      this.users= this.users.filter((user)=> user.id !==id)
      return {message:`Usuario con id: ${id} eliminado`, users:this.users}
    } else {return `Usuario con id: ${id} no encontrado` }
  }

}