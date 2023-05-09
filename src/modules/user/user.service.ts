import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    return this.knex('users').insert(createUserDto).returning('*');
  }

  findAll() {
    return this.knex('users');
  }

  async findOne(id: number) {
    const [user] = await this.knex('users').where({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      await this.knex('users').where({ id }).update({
        name: updateUserDto.name,
      });

      return {
        success: true,
        message: 'user details updated successfully.',
      };
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) {
      await this.knex('users').where({ id }).del();

      return {
        success: true,
        message: 'user deleted successfully.',
      };
    }
  }
}
