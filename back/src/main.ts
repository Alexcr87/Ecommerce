import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal} from './middleware/logger.middleware';
import { connectionSource } from './config/typeorm';

async function bootstrap() {
  await connectionSource.initialize()
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  await app.listen(3000);
}
bootstrap();
