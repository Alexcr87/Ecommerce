import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/users.module';
import { ProductsModule } from './modules/Products/products.module';
import { AuthModule } from './modules/Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'./.env.development',
    }),
       
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=>({
        type:'postgres',
        database: configService.get('DB_NAME'),
        host:configService.get('DB_HOST'),
        port:configService.get('DB_PORT'),
        username:configService.get('DB_USERNAME'),
        password:configService.get('DB_PASSWORD'),        
        synchronize:true,
        logging:true
      }),
    }),
   UsersModule,
    ProductsModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
