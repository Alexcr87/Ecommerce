import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal} from './middleware/logger.middleware';
import { connectionSource } from './config/typeorm';
import { CategoriesSeed } from './modules/Seeds/categories/categories.seed';
import { ProductsSeed } from './modules/Seeds/products/products,seed';
import { ValidationPipe } from '@nestjs/common'
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/auth0'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  await connectionSource.initialize()
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe())
  app.use(loggerGlobal)
  
  const categoriesSeed=app.get(CategoriesSeed)
  await categoriesSeed.seed()
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Ecommerce ')
  .setDescription('Esta es una API construida con Nest para ser empleada en el modulo 4')
  .setVersion('2.0')
  .addBearerAuth()
  .build()
  
  const productsSeed =app.get(ProductsSeed)
  await productsSeed.seed()
 
  const document =SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}

bootstrap();
