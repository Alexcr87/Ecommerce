import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository){}
  getAuth(){return this.authRepository.getAuth()}
}