import { Module } from '@nestjs/common';
import { OrganizationUserService } from './organization-user.service';
import { OrganizationUserController } from './organization-user.controller';

@Module({
  controllers: [OrganizationUserController],
  providers: [OrganizationUserService],
})
export class OrganizationUserModule {}
