import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export enum TaskStatus {
  CREATED = 'CREATED',
  IN_PROCESS = 'IN_PROCESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsInt()
  created_by: number;

  @IsNotEmpty()
  @IsInt()
  project_id: number;

  @IsOptional()
  @IsInt()
  worker_user_id: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsNotEmpty()
  due_date: Date;
}
