import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateOrganizationDto {
  @ApiProperty({ name: 'name', required: true, type: 'string' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
  name: string;
}
