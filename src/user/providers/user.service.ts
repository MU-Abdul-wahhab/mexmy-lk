import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUser } from '../interfaces/create-user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly usersModel : Model<UserDocument>
  ) {}

  public async createUser(user : CreateUser) :
    Promise<Omit<User, 'password' | 'passwordChangedAt' | 'token' | 'tokenTime'>>{
      const newUser : UserDocument = new this.usersModel(user);

      const savedUser : UserDocument = await newUser.save();

      const userObj = savedUser.toObject() as User;
      const {password , passwordChangedAt, token , tokenTime, ...userResponse} = userObj;

      return userResponse;
  }

  public  async findByEmailAndMobile(email : string, mobile : string) : Promise<UserDocument | null>{
    return this.usersModel.findOne({
      $or : [{email} , {mobile}]
    });
  }

  public async findByEmail(email : string) : Promise<UserDocument | null >{
    return this.usersModel.findOne({email}).select('+password')
  }

}
