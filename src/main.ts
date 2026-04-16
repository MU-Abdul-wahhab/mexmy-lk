import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createApp } from './createApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  createApp(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
