import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpConfig } from './config/entities/http.config.entity';

const httpConfig = new HttpConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(httpConfig.prefix);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(httpConfig.port);
}
bootstrap();
