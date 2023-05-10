import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    name: 'created_by',
    required: true,
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  created_by: number;

  @ApiProperty({ name: 'org_id', required: true, type: 'number', example: 1 })
  @IsNotEmpty()
  @IsInt()
  org_id: number;
}
