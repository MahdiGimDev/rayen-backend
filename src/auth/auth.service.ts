import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../main/services/users.service';
import { User } from '../main/entities/user.entity';
import UUIDAPIKey  from '../../node_modules/uuid-apikey/index';
import {
  JwtPayload,
  LoginUserModel,
  CreateUserDto,
  RegistrationStatus,
  GoogleProfileModel,
} from './auth.models';
import { UserDto } from '../models/user.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePwd } from '../helpers/user.helper';
import { environment } from 'src/environments/environment';
import { MailerService } from '../main/services/mail.service';
import { MailingSendModel } from '../shared/models/mailing.model';

export enum Provider {
  GOOGLE = 'google',
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(loginUserDto: LoginUserModel): Promise<any> {
    // find user in db const user = await
    const user = await this.userService.findByLogin(loginUserDto);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    // compare passwords const areEqual =
    const areEqual = await comparePwd(loginUserDto.password, user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    // check if user is verified
    if (!user.verified) {
      throw new HttpException('Account Not Verified', HttpStatus.BAD_REQUEST);
    }

    // check if user is activated
    if (!user.activated) {
      throw new HttpException('Account Disabled', HttpStatus.BAD_REQUEST);
    }
    // generate and sign token
    const token = this._createToken(user);
    return { username: user.username, ...token };
  }

  private _createToken({
    username,
    firstName,
    lastName,
    id,
    email,
    role,
    file,
  }: User): any {
    const payload: JwtPayload = {
      username,
      id,
      email,
      role,

      firstName,
      lastName,
    };
    const accessToken = this.jwtService.sign(payload);
    return { expiresIn: process.env.EXPIRESIN, accessToken };
  }

  async resetPasswordRequest(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Account Not Found', HttpStatus.BAD_REQUEST);
    }
    const resetPasswordToken = UUIDAPIKey.create().uuid;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    user.resetPasswordExpireAt = date;
    user.resetPasswordToken = resetPasswordToken;
    try {
      this.mailerService.sendResetMail(user);
    } catch (error) {
      console.log({ error: error.response });
    }
    return await this.userService.updateUser(user);
  }

  async verificationRequest(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    if (user.verified) {
      throw new HttpException(
        'User is already verified',
        HttpStatus.BAD_REQUEST,
      );
    }
    const verifyToken = UUIDAPIKey.create().uuid;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    user.verifyExpireAt = date;
    user.verifyToken = verifyToken;
    return await this.userService.updateUser(user);
  }

  async verifyAccount({ email, token }) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Email Not Found', HttpStatus.BAD_REQUEST);
    }
    if (user.verifyToken != token) {
      throw new HttpException(
        'Invalid Verification Token',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.verifyExpireAt < new Date()) {
      throw new HttpException(
        'Expired Verification Token',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.verifyExpireAt = null;
    user.verifyToken = null;
    user.verified = true;
    return await this.userService.updateUser(user);
  }

  async resetPassword({ email, token, password }) {
    const user = await this.userService.findByEmail(email);
    if (password.length < 6) {
      throw new HttpException('Password too short', HttpStatus.BAD_REQUEST);
    }
    if (!user) {
      throw new HttpException('Email Not Found', HttpStatus.BAD_REQUEST);
    }
    if (user.resetPasswordToken != token) {
      throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
    }
    if (user.resetPasswordExpireAt < new Date()) {
      throw new HttpException('Expired Token', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.updateUserPassword(user, password);
  }

  async register(
    userDto: CreateUserDto,
    image: any,
    cv: any,
  ): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userService.create(userDto, image, cv);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  // async validateOAuthLogin(profile: GoogleProfileModel): Promise<string> {
  //   try {
  //     // You can add some registration logic here,
  //     // to register the user using their thirdPartyId (in this case their googleId)
  //     // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

  //     // if (!user)
  //     const googleID = profile.id;
  //     let user: User = await this.userService.findByEmail(profile._json.email);
  //     if (!user) {
  //       const userDto: CreateUserDto = {
  //         email: profile._json.email,
  //         username: profile._json.given_name,
  //         password: uuidAPIKey.create().uuid,
  //         skillsIds: [],
  //         certifsIds: [],
  //         file: profile._json.picture,
  //         googleID,
  //         firstName: profile._json.name,
  //         lastName: profile._json.family_name,
  //         verified: true,
  //       };
  //       user = await this.userService.create(userDto);
  //     } else {
  //       if (user.googleID != googleID) {
  //         user.googleID = googleID;
  //         await this.userService.updateUser(user);
  //       }
  //     }

  //     const { username, id, email, role, file, firstName, lastName } = user;
  //     const payload: JwtPayload = {
  //       username,
  //       id,
  //       email,
  //       role,

  //       firstName,
  //       lastName,
  //     };
  //     const accessToken = this.jwtService.sign(payload);
  //     return accessToken;
  //   } catch (err) {
  //     throw new InternalServerErrorException('validateOAuthLogin', err.message);
  //   }
  // }
}
