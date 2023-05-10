import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ResponseData } from '../types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseData> {
    return this.knex('Users')
      .insert(createUserDto)
      .returning('*')
      .then((data) => ({
        success: true,
        message: 'User added successfully.',
        data,
      }))
      .catch((e) => ({ success: false, message: e.detail, data: {} }));
  }

  async findAll(): Promise<ResponseData> {
    const users = await this.knex('Users');

    return {
      success: true,
      message: 'User details fetch successfully.',
      data: users,
    };
  }

  async findOne(id: number): Promise<ResponseData> {
    const [user] = await this.knex('Users').where({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return {
      success: true,
      message: 'User details fetch successfully.',
      data: user,
    };
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseData> {
    const user = await this.findOne(id);
    if (user) {
      await this.knex('Users').where({ id }).update({
        role: updateUserDto.role,
      });

      return {
        success: true,
        message: 'user role updated successfully.',
        data: {},
      };
    }
  }

  async remove(id: number): Promise<ResponseData> {
    const user = await this.findOne(id);
    if (user) {
      await this.knex('Users').where({ id }).del();

      return {
        success: true,
        message: 'user deleted successfully.',
        data: {},
      };
    }
  }
}
