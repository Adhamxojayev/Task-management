import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    return this.knex('Users').insert(createUserDto).returning('*');
  }

  findAll() {
    return this.knex('Users');
  }

  async findOne(id: number) {
    const [user] = await this.knex('Users').where({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      await this.knex('Users').where({ id }).update({
        role: updateUserDto.role,
      });

      return {
        success: true,
        message: 'user role updated successfully.',
      };
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) {
      await this.knex('Users').where({ id }).del();

      return {
        success: true,
        message: 'user deleted successfully.',
      };
    }
  }
}
