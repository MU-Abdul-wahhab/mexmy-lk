import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from './config/mail.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import {join} from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';
import { EmailProducer } from './providers/email.producer';
import { EmailProcessor } from './providers/email.processor';
import { BullModule } from '@nestjs/bullmq';
import { MAIL_QUEUE } from './constants/mail-queues.constant';

@Global()
@Module({
 imports : [
   ConfigModule.forFeature(mailConfig),
   BullModule.registerQueue({name : MAIL_QUEUE}),
   MailerModule.forRootAsync({
    imports: [ConfigModule.forFeature(mailConfig)],
    inject: [mailConfig.KEY],
    useFactory : (config : ConfigType<typeof mailConfig>) =>({
     transport :{
       host: config.host,
       port: config.port,
       secure : false,
       auth : {
         user : config.username,
         pass : config.password,
       }
     },
      defaults : {
       from :  config.fromEmail
      },
     template : {
       adapter : new EjsAdapter({
         inlineCssEnabled : true
       }),
       dir : join(__dirname , 'templates'),
       options : {
         strict : false,
       }
     }
    })
   })
 ],
 providers : [MailService, EmailProducer, EmailProcessor],
 exports : [EmailProducer],
})
export class MailModule {}
