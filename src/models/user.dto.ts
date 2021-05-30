import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MissionType, UserFormation, UserLevels } from './role.mode';

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class UserUpdateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  formation?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  @IsNotEmpty()
  ville?: string;

  
  @ApiProperty({ example: '003300000000' })
  @IsNotEmpty()
  phonenumber?: string;

}


export class AdministrativeCreateDTO {
  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  devise: string;

  @ApiProperty({ example: 1 })
  missionId: number;




  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  transport: string;


  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  logement: string;

  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  visa: string;

  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  bonfile: string;


}

export class MissionCreateDTO {
  @ApiProperty({
    example: 'title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'title',
  })
  @IsNotEmpty()
  purchase: string;

  @ApiProperty({
    example: 'title',
  })
  @IsNotEmpty()
  invoice: string;

  

  @ApiProperty({
    example: 'technologies',
  })
  @IsNotEmpty()
  technologies: string;

  @ApiProperty({
    example: 3,
  })
  @IsNotEmpty()
  period: number;

  @ApiProperty({
    example: 'address',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'dist',
  })
  @IsNotEmpty()
  categorie: string;

  @ApiProperty()
  @IsNotEmpty()
  visa: string;

  @ApiProperty()
  @IsNotEmpty()
  transport: string;

  @ApiProperty()
  @IsNotEmpty()
  logement: string;


  @ApiProperty()
  @IsNotEmpty()
  planfile: string;

  @ApiProperty()
  @IsNotEmpty()
  devise: string;
  
  @ApiProperty()
  @IsNotEmpty()
  bonfile: string;


  
  @ApiProperty()
  @IsNotEmpty()
  level: UserLevels;

  @ApiProperty({ example: 1 })
  clientId: number;

  @ApiProperty({ example: 1 })
  userId: number;

    @ApiProperty({ default: [], example: [1, 3] })
    skillsIds: Array<number>;

  @ApiProperty()
  @IsNotEmpty()
  type: MissionType;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;
}

export class DocumentUpdateDTO {
  @ApiProperty({
    example: 'title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'sujet',
  })
  @IsNotEmpty()
  sujet: string;

  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'file',
  })
  @IsNotEmpty()
  file: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;
}

export class MissionUpdateDTO {
  @ApiProperty({
    example: 'title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'technologies',
  })
  @IsNotEmpty()
  technologies: string;

  @ApiProperty({
    example: 'period',
  })
  @IsNotEmpty()
  period: number;

  @ApiProperty({
    example: 'address',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'description',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'cv',
  })
  @IsNotEmpty()
  cv: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;
}
