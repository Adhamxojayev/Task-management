import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({ name: 'projectId', required: false })
  @IsOptional()
  @IsString()
  projectId?: string;
}
