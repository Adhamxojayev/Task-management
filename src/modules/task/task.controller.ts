import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryDto } from './dto/query-task.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Task added successfully.',
    type: [CreateTaskDto],
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.create(createTaskDto);
    if (!task.success) {
      throw new BadRequestException({ status: 400, message: task.message });
    }
    return task;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Tasks details fetch successfully.',
    type: [CreateTaskDto],
  })
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: QueryDto) {
    return this.taskService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Tasks details fetch successfully.',
    type: CreateTaskDto,
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Tasks details updated successfully.',
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Tasks deleted successfully.',
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
