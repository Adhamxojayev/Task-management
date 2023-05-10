import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { OrganizationUserModule } from './modules/organization-user/organization-user.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    SharedModule,
    UserModule,
    OrganizationModule,
    OrganizationUserModule,
    ProjectModule,
    TaskModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
