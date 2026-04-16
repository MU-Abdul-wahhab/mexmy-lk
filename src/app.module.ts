import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import environmentValidation from './common/config/environment.validation';
import appConfig from './common/config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import databaseConfig from './common/config/database.config';
import mailConfig from './mail/config/mail.config';
import { BullModule } from '@nestjs/bullmq';
import redisConfig from './common/config/redis.config';


const ENV = process.env.NODE_ENV ?? 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath : `.env.${ENV}`,
      validationSchema : environmentValidation,
      load : [appConfig , databaseConfig]
    }),
    MongooseModule.forRootAsync({
      inject : [databaseConfig.KEY],
      useFactory : (dbConfig : ConfigType<typeof databaseConfig>) =>({
        uri : dbConfig.uri,
        dbName : dbConfig.name
      })
    }),
    AuthModule,
    UserModule,
    MailModule,
    BullModule.forRootAsync({
      inject : [redisConfig.KEY],
      imports : [ConfigModule.forFeature(redisConfig)],
      useFactory : (config : ConfigType<typeof redisConfig>)=>{
        const redisUrl = new URL(config.host);
        return {
          connection : {
            host : redisUrl.host,
            port : config.port,
            password: config.password,
            tls : {}
          }
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
