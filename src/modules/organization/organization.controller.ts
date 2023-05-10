import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('organizations')
@ApiTags('Organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Organization added successfully.',
    type: [CreateOrganizationDto],
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    const organiztion = await this.organizationService.create(
      createOrganizationDto,
    );
    if (!organiztion.success) {
      throw new BadRequestException({
        status: 400,
        message: organiztion.message,
      });
    }
    return organiztion;
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Organization details fetch successfully.',
    type: [CreateOrganizationDto],
  })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Organization details fetch successfully.',
    type: CreateOrganizationDto,
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Organization details updated successfully.',
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Organization deleted successfully.',
  })
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
}
