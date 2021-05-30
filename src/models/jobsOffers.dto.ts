import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserFormation, UserLevels, TypeContrat } from './role.mode';

export class JobCreateDTO {
  @ApiProperty({
    example: 'title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'data analyst',
  })
  @IsNotEmpty()
  profil: string;

  @ApiProperty({
    example: 'data analyst',
  })
  @IsNotEmpty()
  ville: string;

  @ApiProperty({
    example: 'data analyst',
  })
  @IsNotEmpty()
  pays: string;

  @ApiProperty({
    example: 'developpeur fullstack',
  })
  @IsNotEmpty()
  poste: string;

  @ApiProperty({
    example: 'B intelligence',
  })
  @IsNotEmpty()
  specialite: string;

  @ApiProperty({ example: 'BAC+5' })
  @IsNotEmpty()
  formation: UserFormation;

  @ApiProperty()
  @IsNotEmpty()
  contrat: TypeContrat;

  @ApiProperty()
  @IsNotEmpty()
  level: UserLevels;

  @ApiProperty({
    example: 'lac1',
  })
  @IsNotEmpty()
  addresse: string;

  @ApiProperty({
    example: 'description',
  })
  description: string;

  @ApiProperty({
    default: [],
    example: [15, 16],
  })
  skillsIds: Array<number>;
  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    example: 'linkedeen',
  })
  @IsNotEmpty()
  shareSM: string;
}
