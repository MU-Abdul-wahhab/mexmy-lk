import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import { UserModule } from '../user/user.module';
import { ArgonProvider } from './providers/argon.provider';
import { HashingProvider } from './providers/hashing.provider';
import { TokenProvider } from './providers/token.provider';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ArgonProvider, {
    provide : HashingProvider,
    useClass : ArgonProvider
  }, TokenProvider],
  imports: [
    ConfigModule.forFeature(authConfig),
    UserModule,
    MailModule
  ]
})
export class AuthModule {}
