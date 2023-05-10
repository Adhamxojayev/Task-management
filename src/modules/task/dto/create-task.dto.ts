import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export enum TaskStatus {
  CREATED = 'CREATED',
  IN_PROCESS = 'IN_PROCESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @ApiProperty({
    name: 'created_by',
    required: true,
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  created_by: number;

  @ApiProperty({
    name: 'project_id',
    required: true,
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  project_id: number;

  @ApiProperty({
    name: 'worker_id',
    required: true,
    type: 'number',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  worker_user_id: number;

  @ApiProperty({
    name: 'status',
    required: true,
    type: 'string',
    default: TaskStatus.CREATED,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    name: 'due_date',
    required: true,
    type: 'Date',
    example: '2023-11-11!9:00',
  })
  @IsNotEmpty()
  due_date: Date;

  @ApiProperty()
  created_at: Date;
}
