import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { ArgonProvider } from './providers/argon.provider';
import { HashingProvider } from './providers/hashing.provider';
import { TokenProvider } from './providers/token.provider';
import { MailModule } from '../mail/mail.module';
import { JwtStrategy } from './providers/jwt-strategy.provider';
import jwtConfig from './config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth-guard.service';
import { JwtTokenProvider } from './providers/jwt-token.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, {
    provide : HashingProvider,
    useClass : ArgonProvider
  }, TokenProvider, JwtStrategy,{
    provide : APP_GUARD,
    useClass : JwtAuthGuard
  }, JwtTokenProvider],
  imports: [
    ConfigModule.forFeature(jwtConfig),
    UserModule,
    MailModule,
    JwtModule.registerAsync({
      imports : [ConfigModule.forFeature(jwtConfig)],
      inject : [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret : config.accessTokenSecret,
        signOptions : {expiresIn : config.accessTokenExpiresIn}
      })
    }
    )
  ]
})
export class AuthModule {}
