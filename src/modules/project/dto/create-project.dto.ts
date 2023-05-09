import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsInt()
  created_by: number;

  @IsNotEmpty()
  @IsInt()
  org_id: number;
}
