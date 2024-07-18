import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository){}
  signin(email, password){return this.authRepository.signin(email, password)}
}