import {registerAs} from '@nestjs/config'

export default registerAs('authConfig' , ()=>({

  authType : process.env.AUTH_TYPE

}))