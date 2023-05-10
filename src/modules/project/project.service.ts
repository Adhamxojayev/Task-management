import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ResponseData } from '../types';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createProjectDto: CreateProjectDto): Promise<ResponseData> {
    return this.knex('Project')
      .insert(createProjectDto)
      .returning('*')
      .then((data) => ({
        success: true,
        message: 'organization added successfully.',
        data,
      }))
      .catch((e) => ({ success: false, message: e.detail, data: {} }));
  }

  async findAll(): Promise<ResponseData> {
    const projects = await this.knex('Project');
    return {
      success: true,
      message: 'Project details fetch successfully.',
      data: projects,
    };
  }

  async findOne(id: number): Promise<ResponseData> {
    const [project] = await this.knex('Project').where({ id });
    if (!project) {
      throw new NotFoundException('project not found');
    }
    return {
      success: true,
      message: 'Project details fetch successfully.',
      data: project,
    };
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ResponseData> {
    const project = await this.findOne(id);
    if (project) {
      await this.knex('Project')
        .where({ id })
        .update({
          org_id: updateProjectDto.org_id,
        })
        .then((d) => d)
        .catch((e) => ({
          error: e.name,
          messages: e.detail,
        }));

      return {
        success: true,
        message: 'project details updated successfully.',
        data: {},
      };
    }
  }

  async remove(id: number): Promise<ResponseData> {
    const project = await this.findOne(id);
    if (project) {
      await this.knex('Project').where({ id }).del();

      return {
        success: true,
        message: 'project deleted successfully.',
        data: {},
      };
    }
  }
}
