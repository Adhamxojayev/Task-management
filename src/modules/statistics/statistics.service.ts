import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ResponseData } from '../types';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class StatisticsService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async findAll(): Promise<ResponseData> {
    const organization = await this.knex
      .select(this.knex.raw('count(*) as number_organization'))
      .from('Organizations')
      .first();

    const project = await this.knex
      .select(this.knex.raw('count(*) as number_project'))
      .from('Project')
      .first();

    const task = await this.knex
      .select(this.knex.raw('count(*) as number_task'))
      .from('Task')
      .first();

    return {
      success: true,
      message: 'Statistics details fetch successfully.',
      data: { ...organization, ...project, ...task },
    };
  }

  async find({ projectId }: QueryDto): Promise<ResponseData> {
    const query = await this.knex('Organizations')
      .select('name as organization_name')
      .countDistinct('Project.id as projects_count')
      .countDistinct('Task.id as tasks_count')
      .leftJoin('Project', 'Organizations.id', 'Project.org_id')
      .leftJoin('Task', 'Project.id', 'Task.project_id')
      .where(function () {
        if (projectId) {
          this.where('Project.id', projectId);
        }
      })
      .groupBy('Organizations.id')
      .then((d) => d)
      .catch((e) => console.error(e));

    return {
      success: true,
      message: 'Statistics details fetch successfully.',
      data: query,
    };
  }
}
