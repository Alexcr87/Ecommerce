import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controllers";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { requiresAuth } from "express-openid-connect";


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers:[UsersService, UsersRepository,],
  controllers:[UsersController]
})

export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('users/auth0/protected')
  }
}