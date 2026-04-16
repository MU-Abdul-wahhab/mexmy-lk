import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponseMessage } from '../common/decorators/api-response-message';
import { API_RESPONSE_MESSAGES } from '../common/constants/api.constant';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly configService : ConfigService
  ){
    console.log(this.configService.get('appConfig.port'));
  }

  // constructor(
  //   private readonly authService: AuthService,
  //
  //   @Inject(appConfig.KEY)
  //   private readonly configService : ConfigType<typeof appConfig>
  // ){
  //   console.log(this.configService.port);
  // }

  @Post('sign-up')
  @ApiResponseMessage(API_RESPONSE_MESSAGES.AUTH.SIGN_UP)
  public signUp(@Body() signupDto : SignUpDto){
    return this.authService.signUp(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponseMessage(API_RESPONSE_MESSAGES.AUTH.LOGIN)
  public login(@Body() loginDto : LoginDto){
    return loginDto;
  }

}
