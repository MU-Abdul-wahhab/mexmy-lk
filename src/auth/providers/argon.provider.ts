import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as argon2 from 'argon2';

@Injectable()
export class ArgonProvider implements HashingProvider{

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verifyPassword(password: string , encryptedPassword : string): Promise<boolean> {
    return await argon2.verify(password , encryptedPassword)
  }

}
