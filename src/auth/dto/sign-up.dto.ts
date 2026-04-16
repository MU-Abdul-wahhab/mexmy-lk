import { BaseStringAndLengthValidator, EmailValidator, GenderValidator, MobileValidator } from '../../common/decorators/api-validation.decorator';
import { GenderEnum } from '../../common/enums/gender.enum';

export class SignUpDto{

  @BaseStringAndLengthValidator('First Name' , 5 , 75)
  firstName: string;

  @BaseStringAndLengthValidator('First Name' , 5 , 75)
  lastName: string;

  @EmailValidator('Email' , 5 , 100)
  email: string;

  @MobileValidator('Mobile')
  mobile: string;

  @BaseStringAndLengthValidator('Password' , 8 , 20)
  password: string;

  @GenderValidator('Gender')
  gender: GenderEnum;
}