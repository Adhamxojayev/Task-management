import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  create(createProjectDto: CreateProjectDto) {
    return this.knex('Project')
      .insert(createProjectDto)
      .returning('*')
      .then((d) => console.log(d))
      .catch((e) => ({
        error: e.name,
        messages: e.detail,
      }));
  }

  findAll() {
    return this.knex('Project');
  }

  async findOne(id: number) {
    const [project] = await this.knex('Project').where({ id });
    if (!project) {
      throw new NotFoundException('project not found');
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    if (project) {
      await this.knex('Project')
        .where({ id })
        .update({
          org_id: updateProjectDto.org_id,
        })
        .then((d) => console.log(d))
        .catch((e) => ({
          error: e.name,
          messages: e.detail,
        }));

      return {
        success: true,
        message: 'project details updated successfully.',
      };
    }
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (project) {
      await this.knex('Project').where({ id }).del();

      return {
        success: true,
        message: 'project deleted successfully.',
      };
    }
  }
}
