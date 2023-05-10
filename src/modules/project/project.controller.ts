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
  BadRequestException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('projects')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Project added successfully.',
    type: [CreateProjectDto],
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectService.create(createProjectDto);
    if (!project.success) {
      throw new BadRequestException({
        status: 400,
        message: project.message,
      });
    }
    return project;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Project details fetch successfully.',
    type: [CreateProjectDto],
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Project details fetch successfully.',
    type: CreateProjectDto,
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Project details updated successfully.',
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully.',
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
