import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { DeleteMenuDto } from './dto/delete-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ListMenuQuery } from './dto/list-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get('list')
  list(@Query() query: ListMenuQuery) {
    if (query.menuId)
      return this.menusService.retrieveDetailMenu({ id: query.menuId });

    return this.menusService.retrieveMenus();
  }

  @Get('list-parent')
  listParent() {
    return this.menusService.retrieveParent();
  }

  @Post('create')
  create(@Body() dto: CreateMenuDto) {
    return this.menusService.insert(dto);
  }

  @Delete('delete')
  delete(@Query() dto: DeleteMenuDto) {
    return this.menusService.removeMenu(dto);
  }

  @Put('update')
  update(@Body() dto: UpdateMenuDto) {
    return this.menusService.update(dto);
  }
}
