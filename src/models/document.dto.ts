import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { DocumentType, DocumentVersion } from "./role.mode";






export class DocumentDto {

@ApiProperty()
@IsNotEmpty()
title: string;


  @ApiProperty()
  @IsNotEmpty()
  sujet: string;


@ApiProperty()
  @IsNotEmpty()
  file: string;




@ApiProperty()
@IsNotEmpty()
type: DocumentType;

@ApiProperty()
@IsNotEmpty()
version: DocumentVersion;



@ApiProperty()
@IsNotEmpty()
startDate: Date;

@ApiProperty({ example: 1 })
clientId: number;
@ApiProperty({ example: 1 })
userId: number;

/*@ApiProperty({ example: 1 })
userId: number;*/


@ApiProperty()
  @IsNotEmpty()
 description: string;




}