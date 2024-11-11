import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const backendPort = configService.get<number>('BPORT', 3333);
  const frontendPort = configService.get<number>('FPORT', 3000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: 'http://localhost:' + frontendPort, // Allow requests from your Next.js frontend
    credentials: true, // Optional: If you need to include cookies or authentication
  });
  await app.listen(backendPort);
}
bootstrap();
