import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateOrganizationUserDto } from './dto/create-organization-user.dto';

@Injectable()
export class OrganizationUserService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  create(createOrganizationUserDto: CreateOrganizationUserDto) {
    return this.knex('OrganizationUser')
      .insert(createOrganizationUserDto)
      .returning('*');
  }

  findAll() {
    return this.knex('OrganizationUser');
  }

  async findOne(id: number) {
    const [organizationUser] = await this.knex('OrganizationUser').where({
      id,
    });
    if (!organizationUser) {
      throw new NotFoundException('OrganizationUser not found');
    }
    return organizationUser;
  }

  async remove(id: number) {
    const organizationUser = await this.findOne(id);
    if (organizationUser) {
      await this.knex('OrganizationUser').where({ id }).del();

      return {
        success: true,
        message: 'OrganizationUser deleted successfully.',
      };
    }
  }
}
