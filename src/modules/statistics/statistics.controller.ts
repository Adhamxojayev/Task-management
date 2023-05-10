import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryDto } from './dto/query.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@ApiTags('Statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        number_organization: 0,
        number_project: 0,
        number_task: 0,
      },
    },
    description: 'Statistics details fetch successfully.',
  })
  findAll() {
    return this.statisticsService.findAll();
  }

  @Get('/organizations')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        organization_name: 'Soft',
        projects_count: '2',
        tasks_count: '8',
      },
    },
    description: 'Statistics details fetch successfully.',
  })
  findOne(@Query() query: QueryDto) {
    return this.statisticsService.find(query);
  }
}
