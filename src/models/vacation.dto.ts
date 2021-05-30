import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { VacationType } from './role.mode';

export class VacationDTO {
  @ApiProperty({
    
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: VacationType.VACATION,
  })
  @IsNotEmpty()
  type: VacationType;

  @ApiProperty({
    example: 10,
  })
  @IsNotEmpty()
  period: number;

  @ApiProperty({
    example: 10,
  })
  @ApiProperty({
    
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
