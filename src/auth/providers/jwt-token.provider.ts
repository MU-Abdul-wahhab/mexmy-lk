import { Inject, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import JwtConfig from '../config/jwt.config';
import { type ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtTokenProvider {

  constructor(
    private readonly jwtService : JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration : ConfigType<typeof jwtConfig>
  ) {

  }


  public async generateAccessToken(user : {_id : mongoose.Types.ObjectId, email : string}) {
    return await this.jwtService.signAsync({
      sub : user._id,
      email : user.email,
    },{
      secret : this.jwtConfiguration.accessTokenSecret,
      expiresIn : this.jwtConfiguration.accessTokenExpiresIn
      }
    )
  }

  public async generateRefreshToken(id : mongoose.Types.ObjectId) {
    return await this.jwtService.signAsync({
        sub : id
      },{
        secret : this.jwtConfiguration.refreshTokenSecret,
        expiresIn : this.jwtConfiguration.refreshTokenExpiresIn
      }
    )
  }

}
