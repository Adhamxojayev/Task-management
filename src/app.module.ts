import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [SharedModule, UserModule, OrganizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
