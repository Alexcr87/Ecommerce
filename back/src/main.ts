import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal} from './middleware/logger.middleware';
import { connectionSource } from './config/typeorm';
import { CategoriesSeed } from './modules/Seeds/categories/categories.seed';
import { ProductsSeed } from './modules/Seeds/products/products,seed';
import 'reflect-metadata'

async function bootstrap() {
  await connectionSource.initialize()
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  
  const categoriesSeed=app.get(CategoriesSeed)
  await categoriesSeed.seed()

  
  const productsSeed =app.get(ProductsSeed)
  await productsSeed.seed()
 
  
  await app.listen(3000);
}
bootstrap();
