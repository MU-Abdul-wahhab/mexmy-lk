import {registerAs} from '@nestjs/config'
import { StringValue } from 'ms';

export default registerAs('jwtConfig' , ()=>({

  accessTokenSecret : process.env.JWT_ACCESS_TOKEN_SECRET as string,
  accessTokenExpiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as StringValue,
  refreshTokenSecret : process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn : process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as StringValue

}))