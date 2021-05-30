import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ContratType } from "./role.mode";







export class ExperienceDTO {
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
        example: 'description',
      })
      @IsNotEmpty()
     description: string;

     @ApiProperty({
        example: 'etablissement',
      })
      @IsNotEmpty()
      etablissement: string;

      @ApiProperty({
        example: 'Tunis',
      })
      @IsNotEmpty()
      ville: string;

      @ApiProperty({
        example: 'Tunisie',
      })
      @IsNotEmpty()
      pays: string;

      @ApiProperty({
        example: 'poste',
      })
      @IsNotEmpty()
      poste: string;

      @ApiProperty({
        example: 'grade',
      })
      @IsNotEmpty()
      grade: string;


      @ApiProperty({
        example: 'adresse',
      })
      @IsNotEmpty()
      adress: string;
  
    @ApiProperty({
      example: ContratType.CDI,
    })
    @IsNotEmpty()
    type: ContratType;
  
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
  