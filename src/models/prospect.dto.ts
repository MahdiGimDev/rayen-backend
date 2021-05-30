import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ProspectStatus } from "./role.mode";




export class prospectDto {

    @ApiProperty({
      
      })
      @IsNotEmpty()
      nom: string;

      @ApiProperty({
      
    })
    @IsNotEmpty()
    sujet: string;

    @ApiProperty({
      
    })
    @IsNotEmpty()
    description: string;


      @ApiProperty({
      
    })
    @IsNotEmpty()
  address: string;
    
    @ApiProperty({
      
    })
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({
      
    })
    @IsNotEmpty()
    phonenumber: string;

    @ApiProperty({
      
    })
    @IsNotEmpty()
    secteur: string;


    @ApiProperty({
      
    })
    @IsNotEmpty()
    status1: ProspectStatus;



    @ApiProperty()
  endDate: Date;

}