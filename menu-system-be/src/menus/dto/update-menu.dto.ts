import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
