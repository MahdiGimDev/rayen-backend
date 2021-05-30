import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";



export class CertifsDto {
    @ApiProperty({
        example: 'devops',
      })
      @IsNotEmpty()
      label: string;
    
      @ApiProperty({
        example: 'docker',
      })
      @IsNotEmpty()
      description: string;
  }
  export class CertifsUpdateDTO  {
    @ApiProperty({
        example: 'label',
      })
      @IsNotEmpty()
      label: string;
    
      @ApiProperty({
        example: 'description',
      })
      @IsNotEmpty()
      description: string;
  }