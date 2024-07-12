import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository{
  private auth=
  [
    {
      email:"christian@mail.com",
      password: "1"
    },
    {
      email:"yesi@mail.com",
      password:"2"
    },
    {
      email:"valen@mail.com",
      password:"3"
    },
  ]
  async getAuth(){
    return this.auth
  }
}