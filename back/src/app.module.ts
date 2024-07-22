import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { AuthModule } from './modules/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typormConfig from './config/typeorm'


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
    //AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
