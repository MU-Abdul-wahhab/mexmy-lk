import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserTypeEnum } from './constants/user-type.enum';
import { GenderEnum } from '../common/enums/gender.enum';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User{
  @Prop({
    type : String,
    required : true,
    trim : true
  })
  firstName : string;

  @Prop({
    type : String,
    required : true,
    trim : true
  })
  lastName : string;

  @Prop({
    type : String,
    unique : true,
    required : true,
    trim : true,
    index : true
  })
  email : string;

  @Prop({
    type : String,
    required : true,
    select : false
  })
  password? : string;

  @Prop({
    type : Boolean,
    default: false
  })
  emailVerified : boolean;

  @Prop({
    type : String,
    required : true,
    unique : true,
    trim : true,
    index : true
  })
  mobile : string;

  @Prop({
    type : Boolean,
    default : false
  })
  mobileVerified : boolean;

  @Prop({
    type : Boolean,
    required : true,
    default : true,
    index : true
  })
  status : boolean;

  @Prop({
    type : String,
    enum : GenderEnum,
    required : true,
    index : true
  })
  gender : GenderEnum;

  @Prop({
    type : String,
    required : false,
  })
  profilePic? : string;

  @Prop({
    type : String,
    required : true,
    enum : UserTypeEnum,
    default : UserTypeEnum.USER,
    index : true
  })
  userType : UserTypeEnum;

  @Prop({
    type: Date,
    required: false,
    select: false
  })
  passwordChangedAt?: Date;

  @Prop({
    type : Number,
    required : false
  })
  token : string;

  @Prop({
    type : Date,
    required : false,
    select : false
  })
  tokenTime? : Date;
}

export const UserSchema = SchemaFactory.createForClass(User);