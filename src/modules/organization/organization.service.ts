import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.knex('Organizations')
      .insert(createOrganizationDto)
      .returning('*');
  }

  findAll() {
    return this.knex('Organizations');
  }

  async findOne(id: number) {
    const [organization] = await this.knex('Organizations').where({ id });
    if (!organization) {
      throw new NotFoundException('organization not found');
    }
    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.findOne(id);
    if (organization) {
      await this.knex('Organizations').where({ id }).update({
        name: updateOrganizationDto.name,
      });

      return {
        success: true,
        message: 'organization details updated successfully.',
      };
    }
  }

  async remove(id: number) {
    const organization = await this.findOne(id);
    if (organization) {
      await this.knex('Organizations').where({ id }).del();

      return {
        success: true,
        message: 'organization deleted successfully.',
      };
    }
  }
}
