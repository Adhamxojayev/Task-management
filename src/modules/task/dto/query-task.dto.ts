import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class QueryDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(['done', 'created', 'in_process'])
  status?: TaskStatus;
}
