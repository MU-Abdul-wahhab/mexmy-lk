import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';

@Injectable()
export class TokenProvider {

  public generateToken(): number{
    return randomInt(100000 , 1000000)
  }

  public generateTokenTime(minutes : number = 5) : Date{
    return new Date(Date.now() + minutes * 60 * 1000)
  }

  public isTokenExpired(tokenTime: Date): boolean {
    return Date.now() > tokenTime.getTime();
  }

}
