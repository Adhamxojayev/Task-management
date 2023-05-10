import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ResponseData } from '../types';
import { CreateOrganizationUserDto } from './dto/create-organization-user.dto';

@Injectable()
export class OrganizationUserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(
    createOrganizationUserDto: CreateOrganizationUserDto,
  ): Promise<ResponseData> {
    return this.knex('OrganizationUser')
      .insert(createOrganizationUserDto)
      .returning('*')
      .then((data) => ({
        success: true,
        message: 'organization user added successfully.',
        data,
      }))
      .catch((e) => ({ success: false, message: e.detail, data: {} }));
  }

  async findAll(): Promise<ResponseData> {
    const OrganizationUser = await this.knex('OrganizationUser');
    return {
      success: true,
      message: 'organization user details fetch successfully.',
      data: OrganizationUser,
    };
  }

  async findOne(id: number): Promise<ResponseData> {
    const [organizationUser] = await this.knex('OrganizationUser').where({
      id,
    });
    if (!organizationUser) {
      throw new NotFoundException('OrganizationUser not found');
    }
    return {
      success: true,
      message: 'organization user details fetch successfully.',
      data: organizationUser,
    };
  }

  async remove(id: number): Promise<ResponseData> {
    const organizationUser = await this.findOne(id);
    if (organizationUser) {
      await this.knex('OrganizationUser').where({ id }).del();

      return {
        success: true,
        message: 'OrganizationUser deleted successfully.',
        data: {},
      };
    }
  }
}
