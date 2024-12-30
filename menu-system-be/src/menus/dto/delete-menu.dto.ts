import { IsString, IsUUID } from 'class-validator';

export class DeleteMenuDto {
  @IsString()
  @IsUUID()
  id: string;
}
