import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { OrganizationUserModule } from './modules/organization-user/organization-user.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    OrganizationModule,
    OrganizationUserModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
