import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ResponseData } from '../types/index';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueryDto } from './dto/query-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createTaskDto: CreateTaskDto): Promise<ResponseData> {
    return this.knex('Task')
      .insert(createTaskDto)
      .returning('*')
      .then((data) => ({
        success: true,
        message: 'User added successfully.',
        data,
      }))
      .catch((e) => ({ success: false, message: e.detail, data: {} }));
  }

  async findAll({
    projectId,
    status,
    userId,
  }: QueryDto): Promise<ResponseData> {
    const tasks = await this.knex('Task')
      .leftJoin('Project', 'Task.project_id', 'Project.id')
      .where(function () {
        if (status) {
          this.where('Task.status', status.toUpperCase());
        }
        if (projectId) {
          this.where('Task.project_id', projectId);
        }
        if (userId) {
          this.where('Task.worker_user_id', userId);
        }
      })
      .then((tasks) => tasks)
      .catch((error) => {
        console.error(error);
      });

    return {
      success: true,
      message: 'Tasks details fetch successfully.',
      data: tasks,
    };
  }

  async findOne(id: number): Promise<ResponseData> {
    const [task] = await this.knex('Task').where({ id });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseData> {
    const task = await this.findOne(id);
    const currentTime = new Date().toISOString();
    if (task) {
      const task = await this.knex('Task')
        .where({ id })
        .update({
          status: updateTaskDto.status,
          done_at:
            updateTaskDto.status == 'DONE'
              ? currentTime
              : updateTaskDto.done_at,
          due_date: updateTaskDto.due_date,
        })
        .then((d) => d)
        .catch((e) => ({
          error: e.name,
          messages: e.detail,
        }));

      return {
        success: true,
        message: 'task details updated successfully.',
        data: task,
      };
    }
  }

  async remove(id: number): Promise<ResponseData> {
    const task = await this.findOne(id);
    if (task) {
      await this.knex('Task').where({ id }).del();

      return {
        success: true,
        message: 'task deleted successfully.',
        data: task,
      };
    }
  }
}
