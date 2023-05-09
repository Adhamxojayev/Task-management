import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  done_at?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  due_date?: Date;
}
