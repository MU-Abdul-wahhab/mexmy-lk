import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { Reflector } from '@nestjs/core';


export function createApp(app : INestApplication){

  app.setGlobalPrefix("/api/v1")
  app.useGlobalInterceptors(new ApiResponseInterceptor(new Reflector()))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted : true,
    transform: true,
    stopAtFirstError : true,
    transformOptions : {
      enableImplicitConversion : true
    }
  }));

  app.enableCors()

}