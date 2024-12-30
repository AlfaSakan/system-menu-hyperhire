import { IsOptional, IsUUID } from 'class-validator';

export class ListMenuQuery {
  @IsOptional()
  @IsUUID()
  menuId?: string;
}
