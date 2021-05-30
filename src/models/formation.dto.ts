import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { FormationType,FormationExperienceType } from "./role.mode";


export class FormationDTO {
    @ApiProperty({
      example: 'title',
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'specialite',
      })
      @IsNotEmpty()
     speciality: string;

     @ApiProperty({
      example: 'en cours',
    })
    @IsNotEmpty()
   categorie: string;

     @ApiProperty({
        example: 'description',
      })
      @IsNotEmpty()
    description: string;


    @ApiProperty({
      example: 'UBCI',
    })
    @IsNotEmpty()
    establishment: string;

    @ApiProperty({
      example: 'Ingenieur dev',
    })
    @IsNotEmpty()
    post: string;
  
    @ApiProperty({
      example: FormationType.UNIV,
    })
    @IsNotEmpty()
    type: FormationType;

    @ApiProperty({
      example: FormationExperienceType.FORMATION,
    })
    @IsNotEmpty()
    type2: FormationExperienceType;
  
    @ApiProperty({
      example: 10,
    })
    @IsNotEmpty()
    period: number;
  
    @ApiProperty({
      example: 10,
    })
    @ApiProperty({
      example: 'certificat medical',
    })
    @IsNotEmpty()
    file: string;
  
    @ApiProperty()
    @IsNotEmpty()
    startDate: Date;
  
    @ApiProperty()
    @IsNotEmpty()
    endDate: Date;
  }
  