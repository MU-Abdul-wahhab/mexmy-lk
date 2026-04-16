import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, pipe , map } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_KEY } from '../constants/api.constant';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {

  constructor(private readonly reflector : Reflector) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const startTime : number = Date.now();
    const requestedTime : string = new Date().toDateString();

    const message = this.reflector.get<string>(RESPONSE_MESSAGE_KEY , context.getHandler())
    ?? 'Success';

    const response = context.switchToHttp().getResponse();

    return next.handle()
      .pipe(map(payload => ({
        status : true,
        message,
        data : payload,
        statusCode : response.statusCode,
        requestedTime,
        responseTime : `${Date.now() - startTime}ms`,
        timeStamp : new Date().toISOString()
      })));
  }
}