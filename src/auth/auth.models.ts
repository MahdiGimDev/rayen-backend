import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@nestjs/common';
import { TypeProvider, UserRoles } from '../models/role.mode';

export interface JwtPayload {
  image?: any;
  username: string;
  email: string;
  role: string;
  id: number;
  firstName: string;
  lastName: string;
}

export class RegistrationStatus {
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty({ example: 'message' })
  message: string;
}

export class LoginUserModel {
  @ApiProperty({ example: 'admin@flp.com' })
  email: string;
  @ApiProperty({ example: 'NaaSCap2020' })
  password: string;
}

export class LoginResponseModel {
  @ApiProperty({ example: 'NaasCap' })
  username: string;
  @ApiProperty({ example: '960000' })
  expiresIn: string;
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1Ni....' })
  accessToken: string;
}

export class ResetPasswordModel {
  @ApiProperty({ example: 'mahdouch@naascap.com' })
  email: string;
  @ApiProperty({ example: '3ff745a6-9257-4cc4-a2e5-705bf8a944ec' })
  token: string;
  @ApiProperty({ example: 'NaaSCap2020' })
  password: string;
}

export class VerificationModel {
  @ApiProperty({ example: 'mahdouch@naascap.com' })
  email: string;
  @ApiProperty({ example: '3ff745a6-9257-4cc4-a2e5-705bf8a944ec' })
  token: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'Username' })
  @IsNotEmpty()
  username: string;

  
  @ApiProperty({ example: '' })
  @IsNotEmpty()
  @IsEmail()
  typep: TypeProvider ;

  @ApiProperty({ example: 'celib' })
  @IsNotEmpty()
  situation?: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  file?: string;

  
  @ApiProperty({ example: '' })
  @IsNotEmpty()
  cv?: string;


  @ApiProperty()
  @IsNotEmpty()
  startDate?: string;

  @ApiProperty()
  @IsNotEmpty()
  immatricule?: string;


  @ApiProperty()
  @IsNotEmpty()
  cin?: string;


  @ApiProperty()
  @IsNotEmpty()
  adress?: string;

  @ApiProperty({ example: 'Naas' })
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({ example: 'Cap' })
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({ example: 'bac-2' })
  @IsNotEmpty()
  formation?: string;

  @ApiProperty({ example: 'mr' })
  @IsNotEmpty()
  gender?: string;

  @ApiProperty({ example: 'jerba' })
  @IsNotEmpty()
  ville?: string;


  @ApiProperty({ example: 'maroc' })
  @IsNotEmpty()
  pays?: string;

  
  @ApiProperty({ example: 'sfax' })
  @IsNotEmpty()
  paysd?: string;

  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  yearsExperience?: number;


  @ApiProperty({ example: '003300000000' })
  @IsNotEmpty()
  phonenumber?: string;

  @ApiProperty({ example: '750' })
  @IsNotEmpty()
  salaire?: number;


  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  vacationmaladie?:number;
 

  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  maxmaladie?: number;

  @ApiProperty({ example: '5' })
  @IsNotEmpty()
  maxvacation?: number;

  @ApiProperty({ example: '750' })
  @IsNotEmpty()
  tjme?: number;


  @ApiProperty({ example: '0' })
  @IsNotEmpty()
  vacations?: number;

  @ApiProperty({ example: '750' })
  @IsNotEmpty()
  tjmd?: number;

  @ApiProperty({ example: '01/01/2000' })
  @IsNotEmpty()
  dateBirth?: string;

  @ApiProperty({
    enum: [
      'ADMIN',
      'RH',
      'EMPLOYEE',
      'PROVIDER',
      'COMMERCIAL',
      'OPERATIONAL',
      'CLIENT',
    ],
  })
  @IsNotEmpty()
  role?: any;

  @ApiProperty({ example: 'NaasCap2020' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'NaasCap2020' })
  @IsNotEmpty()
  confirmPassword?: string;

  @ApiProperty({ example: 'email@naascap.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty() verified?: boolean;
  @IsNotEmpty() googleID?: string;
  @ApiProperty()
  skillsIds: Array<number>;

  @ApiProperty()
  certifsIds: Array<number>;

}

export interface GoogleProfileModel {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  photos: [any];
  emails: [any];
  provider: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    email: string;
    email_verified: boolean;
    picture: string;
    locale: string;
  };
}
