import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controllers";
import { AuthRepository } from "./auth.repository";
import { UsersRepository } from "../Users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../Users/users.entity";


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers:[AuthService, AuthRepository, UsersRepository],
  controllers:[AuthController]
})
export class AuthModule {}