import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrganizationUserDto {
  @IsNotEmpty()
  @IsInt()
  org_id: number;

  @IsNotEmpty()
  @IsInt()
  user_id: number;
}
