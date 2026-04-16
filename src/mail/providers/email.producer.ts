import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { MAIL_QUEUE, WELCOME_EMAIL_JOB } from '../constants/mail-queues.constant';
import { WelcomeEmail } from '../interfaces/welcome-email.interface';

@Injectable()
export class EmailProducer {

  constructor(
    @InjectQueue(MAIL_QUEUE)
    private readonly queue : Queue
  ){}

  public async welcomeEmail(payload : WelcomeEmail){
    await this.queue.add(WELCOME_EMAIL_JOB , payload,{
      attempts : 3,
      backoff : {type : 'exponential' , delay : 5000},
      removeOnComplete : true,
      removeOnFail : false
    });
  }

}
