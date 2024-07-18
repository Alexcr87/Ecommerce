import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controllers";
import { AuthRepository } from "./auth.repository";
import { UsersRepository } from "../Users/users.repository";

@Module({
  providers:[AuthService, AuthRepository, UsersRepository],
  controllers:[AuthController]
})
export class AuthModule {}