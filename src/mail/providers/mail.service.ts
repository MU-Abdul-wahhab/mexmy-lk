import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {type ConfigType } from '@nestjs/config';
import mailConfig from '../config/mail.config';
import { WelcomeEmail } from '../interfaces/welcome-email.interface';
import { WELCOME_EMAIL } from '../constants/email-subjects.constant';

@Injectable()
export class MailService {

  constructor(
    private readonly mailerService : MailerService,
    @Inject(mailConfig.KEY)
    private mailConfiguration : ConfigType<typeof mailConfig>
  ) {}

  public async sendUserWelcome(emailPayload : WelcomeEmail){
    await this.mailerService.sendMail({
      to : emailPayload.email,
      subject : WELCOME_EMAIL,
      from : this.mailConfiguration.fromEmail,
      template : './welcome',
      context: {
        token : emailPayload.token,
        firstName : emailPayload.firstName,
        lastName : emailPayload.lastName,
      }
    })
  }

}
