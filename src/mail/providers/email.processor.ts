import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MAIL_QUEUE, WELCOME_EMAIL_JOB } from '../constants/mail-queues.constant';
import { Job } from 'bullmq';
import { MailService } from './mail.service';
import { WelcomeEmail } from '../interfaces/welcome-email.interface';

@Processor(MAIL_QUEUE)
export class EmailProcessor extends WorkerHost{

  constructor(
    private readonly mailService : MailService,
  ){super();}

  async process(job: Job): Promise<void> {
    switch (job.name){
      case WELCOME_EMAIL_JOB:
        await this.handleWelcomeEmail(job);
        break;
      default:
        console.log(`Unknown job name: ${job.name}`);
    }
  }

  private async handleWelcomeEmail(job: Job<WelcomeEmail>): Promise<void> {
    await this.mailService.sendUserWelcome(job.data)
  }

}
