import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  name: string;

  @IsNotEmpty()
  @IsInt()
  created_by: number;
}
