import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controllers";
import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers:[UsersService, UsersRepository,],
  controllers:[UsersController]
})

export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes("users")
  }
}