import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { ResponseData } from '../types';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<ResponseData> {
    return this.knex('Organizations')
      .insert(createOrganizationDto)
      .returning('*')
      .then((data) => ({
        success: true,
        message: 'organization added successfully.',
        data,
      }))
      .catch((e) => ({ success: false, message: e.detail, data: {} }));
  }

  async findAll(): Promise<ResponseData> {
    const organizations = await this.knex('Organizations');
    return {
      success: true,
      message: 'organization details fetch successfully.',
      data: organizations,
    };
  }

  async findOne(id: number): Promise<ResponseData> {
    const [organization] = await this.knex('Organizations').where({ id });
    if (!organization) {
      throw new NotFoundException('organization not found');
    }
    return {
      success: true,
      message: 'organization details fetch successfully.',
      data: organization,
    };
  }

  async update(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<ResponseData> {
    const organization = await this.findOne(id);
    if (organization) {
      await this.knex('Organizations').where({ id }).update({
        name: updateOrganizationDto.name,
      });

      return {
        success: true,
        message: 'organization details updated successfully.',
        data: {},
      };
    }
  }

  async remove(id: number): Promise<ResponseData> {
    const organization = await this.findOne(id);
    if (organization) {
      await this.knex('Organizations').where({ id }).del();

      return {
        success: true,
        message: 'organization deleted successfully.',
        data: {},
      };
    }
  }
}
