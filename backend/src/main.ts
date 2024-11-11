import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from your Next.js frontend
    credentials: true, // Optional: If you need to include cookies or authentication
  });
  await app.listen(3333);
}
bootstrap();
