import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { OrganizationUserService } from './organization-user.service';
import { CreateOrganizationUserDto } from './dto/create-organization-user.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('organization-user')
@ApiTags('Organization User')
export class OrganizationUserController {
  constructor(
    private readonly organizationUserService: OrganizationUserService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Organization User added successfully.',
    type: [CreateOrganizationUserDto],
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrganizationUserDto: CreateOrganizationUserDto) {
    const organizationUser = await this.organizationUserService.create(
      createOrganizationUserDto,
    );
    if (!organizationUser.success) {
      throw new BadRequestException({
        status: 400,
        message: organizationUser.message,
      });
    }
    return organizationUser;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Organization User details fetch successfully.',
    type: [CreateOrganizationUserDto],
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.organizationUserService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Organization User details fetch successfully.',
    type: CreateOrganizationUserDto,
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.organizationUserService.findOne(+id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Organization User deleted successfully.',
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.organizationUserService.remove(+id);
  }
}
