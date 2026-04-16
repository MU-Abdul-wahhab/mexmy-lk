import { GenderEnum } from '../../common/enums/gender.enum';
import { UserTypeEnum } from '../constants/user-type.enum';

export interface CreateUser{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile : string;
  gender : GenderEnum;
  profilePic? : string;
  userType?: UserTypeEnum;
  token : number;
  tokenTime : Date;
}