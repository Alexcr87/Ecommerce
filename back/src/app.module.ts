import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typormConfig from './config/typeorm'
import { CategoriesModule } from './modules/Categories/categories.module';
import { OrdersModule } from './modules/Orders/orders.module';
import { SeedsModule } from './modules/Seeds/seeds.module';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './modules/Auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typormConfig]
    }),
       
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=> configService.get('typeorm')
    }),
   UsersModule,
    ProductsModule, 
    AuthModule,
    CategoriesModule,
    OrdersModule,
    SeedsModule
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule {}
