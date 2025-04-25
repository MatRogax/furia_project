import { NestFactory } from '@nestjs/core';
import { AppModule } from './base/modules/app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  console.log(`🚀 Server is running on port: ${port}`);

  await app.listen(port);
}
bootstrap();
