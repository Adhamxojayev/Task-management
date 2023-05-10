import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ name: 'org_id', required: true, type: 'number' })
  @IsNotEmpty()
  @IsInt()
  org_id: number;
}
