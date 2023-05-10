import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    name: 'name',
    required: true,
    type: 'string',
    example: 'Soft',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
  name: string;

  @ApiProperty({
    name: 'created_by',
    required: true,
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  created_by: number;
}
