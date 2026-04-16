import {registerAs} from '@nestjs/config'

export default registerAs('mailConfig', ()=>({

  host : process.env.MAIL_HOST,
  username : process.env.MAIL_SMTP_USERNAME,
  password : process.env.MAIL_SMTP_PASSWORD,
  port : process.env.MAIL_PORT,
  fromEmail : process.env.MAIL_DEFAULT_EMAIL,
}))