import {registerAs} from '@nestjs/config';

export default registerAs('databaseConfig' , ()=>({

  uri: process.env.DATABASE_URI,
  name : process.env.DATABASE_NAME,

}))