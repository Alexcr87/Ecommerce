import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controllers";
import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { UsersRepository } from "./users.repository";

@Module({
  providers:[UsersService, UsersRepository],
  controllers:[UsersController]
})

export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes("users")
  }
}