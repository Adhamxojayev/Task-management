import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  name: string;
}
