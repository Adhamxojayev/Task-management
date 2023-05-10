import { Controller, Get, Query } from '@nestjs/common';
import { QueryDto } from './dto/query.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/all')
  findAll() {
    return this.statisticsService.findAll();
  }

  @Get('/organizations')
  findOne(@Query() query: QueryDto) {
    return this.statisticsService.find(query);
  }
}
