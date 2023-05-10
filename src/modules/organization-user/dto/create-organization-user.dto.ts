import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrganizationUserDto {
  @ApiProperty({ name: 'org_id', required: true, type: 'number', example: 1 })
  @IsNotEmpty()
  @IsInt()
  org_id: number;

  @ApiProperty({ name: 'user_id', required: true, type: 'number', example: 1 })
  @IsNotEmpty()
  @IsInt()
  user_id: number;
}
