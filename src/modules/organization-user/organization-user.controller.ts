import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationUserService } from './organization-user.service';
import { CreateOrganizationUserDto } from './dto/create-organization-user.dto';

@Controller('organization-user')
export class OrganizationUserController {
  constructor(
    private readonly organizationUserService: OrganizationUserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrganizationUserDto: CreateOrganizationUserDto) {
    return this.organizationUserService.create(createOrganizationUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.organizationUserService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.organizationUserService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.organizationUserService.remove(+id);
  }
}
