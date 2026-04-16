import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/providers/user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { HashingProvider } from './hashing.provider';
import { TokenProvider } from './token.provider';
import { MailService } from '../../mail/providers/mail.service';
import { EmailProducer } from '../../mail/providers/email.producer';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private hashingProvider: HashingProvider,
    private tokenProvider: TokenProvider,
    private readonly emailProducer : EmailProducer
  ) {}

  public async signUp(signUpDto : SignUpDto) {

    const isExist = await this.userService.findByEmailAndMobile(signUpDto.email , signUpDto.mobile);

    if(isExist){
      const field = isExist.email === signUpDto.email ? 'Email' : 'Mobile'
      throw new ConflictException(`${field} already exists`);
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

}
