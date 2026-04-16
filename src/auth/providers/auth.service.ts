import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { HashingProvider } from './hashing.provider';
import { TokenProvider } from './token.provider';
import { MailService } from '../../mail/providers/mail.service';
import { EmailProducer } from '../../mail/providers/email.producer';
import { LoginDto } from '../dto/login.dto';
import { API_ERROR_MESSAGE } from '../../common/constants/api-error-message.constant';
import { JwtTokenProvider } from './jwt-token.provider';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
    private readonly tokenProvider: TokenProvider,
    private readonly emailProducer : EmailProducer,
    private readonly jwtTokenProvider: JwtTokenProvider,
  ) {}

  public async signUp(signUpDto : SignUpDto) {

    const isExist = await this.userService.findByEmailAndMobile(signUpDto.email , signUpDto.mobile);

    if(isExist){
      const field = isExist.email === signUpDto.email ? 'Email' : 'Mobile'
      throw new ConflictException(API_ERROR_MESSAGE.auth.alreadyExist(field));
    }

    const token :number = this.tokenProvider.generateToken();
    const tokenTime = this.tokenProvider.generateTokenTime();
    const hashedPassword = await this.hashingProvider.hashPassword(signUpDto.password);


    const user =  await this.userService.createUser({
      ...signUpDto,
      password : hashedPassword,
      token,
      tokenTime
    });

   try{
     await this.emailProducer.welcomeEmail({
       firstName : user.firstName,
       lastName : user.lastName,
       email : user.email,
       token : token
     })
   }catch(error){
     console.log(error);
   }

    return user;
  }

  public async login(loginDto : LoginDto){

    const user = await this.userService.findByEmail(loginDto.email)

    if(!user || !user.password){
      throw new BadRequestException(API_ERROR_MESSAGE.auth.invalidCredentials)
    }

    const isPasswordCorrect = await this.hashingProvider.verifyPassword(loginDto.password , user.password);

    if(!isPasswordCorrect) throw new BadRequestException(API_ERROR_MESSAGE.auth.invalidCredentials)

    const accessToken = await this.jwtTokenProvider.generateAccessToken({_id: user._id , email : user.email});
    const refreshToken = await this.jwtTokenProvider.generateRefreshToken(user._id)

    const userResponse = user.toObject() as Record<string, any>;
    delete userResponse.password;
    delete userResponse.passwordChangedAt;
    delete userResponse.token;
    delete userResponse.tokenTime;

    return { accessToken, refreshToken, user: userResponse };

  }

}
