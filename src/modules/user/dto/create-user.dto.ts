import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}
