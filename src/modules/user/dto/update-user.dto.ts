import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from './create-user.dto';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}
