import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @ApiProperty({ name: 'done_at', required: false, type: 'string' })
  @IsOptional()
  @IsString()
  done_at?: Date;

  @ApiProperty({
    name: 'status',
    required: false,
    type: 'string',
    default: TaskStatus.DONE,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ name: 'de_date', required: false, type: 'Date' })
  @IsOptional()
  due_date?: Date;
}
