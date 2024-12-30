import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
