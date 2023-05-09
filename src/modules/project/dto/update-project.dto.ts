import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsInt()
  org_id: number;
}
