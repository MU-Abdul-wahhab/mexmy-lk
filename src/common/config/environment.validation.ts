import Joi from 'joi';

export default Joi.object({
  APP_NAME : Joi.string().required(),
  DATABASE_URI : Joi.string().required(),
  DATABASE_NAME : Joi.string().required(),
  MAIL_HOST : Joi.string().required(),
  MAIL_SMTP_USERNAME : Joi.string().required(),
  MAIL_SMTP_PASSWORD : Joi.string().required(),
  MAIL_PORT : Joi.number().integer().positive().required(),
  MAIL_DEFAULT_EMAIL : Joi.string().email().required(),
  REDIS_HOST : Joi.string().required(),
  REDIS_PORT : Joi.number().integer().positive().required(),
})