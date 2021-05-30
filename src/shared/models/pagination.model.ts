import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationModel {
  @ApiProperty({
    example: 5,
  })
  itemCount: number;
  @ApiProperty({
    example: 101,
  })
  totalItems: number;
  @ApiProperty({
    example: 20,
  })
  pageCount: number;
  @ApiProperty({
    example: '',
  })
  next: string;
  @ApiProperty({
    example: '',
  })
  previous: string;
}

export class BasicModel {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: new Date(),
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
  })
  @IsNotEmpty()
  updatedAt: Date;
}

interface PagingResult<Entity> {
  data: Entity[];
  cursor: Cursor;
}

interface Cursor {
  beforeCursor: string | null;
  afterCursor: string | null;
}
