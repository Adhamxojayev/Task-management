import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

export class CreateUserDto {
  @ApiProperty({
    name: 'name',
    required: true,
    type: 'string',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  name: string;

  @ApiProperty({
    name: 'role',
    required: true,
    type: 'string',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    name: 'created_by',
    required: true,
    type: 'number',
  })
  @IsNotEmpty()
  @IsInt()
  created_by: number;
}
