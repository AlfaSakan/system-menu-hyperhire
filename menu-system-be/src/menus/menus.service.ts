import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { DeleteMenuDto } from './dto/delete-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { DetailMenu } from './model/menu.model';
import { SystemMenu } from '@prisma/client';
import { generateEpochSecond } from 'src/utils/helper.util';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async retrieveParent() {
    try {
      const data = await this.prisma.systemMenu.findMany({
        where: { parentId: null },
        orderBy: { createdAt: 'asc' },
      });

      return { ok: true, data };
    } catch (error) {
      return { ok: false, message: 'something went wrong' };
    }
  }

  async retrieveDetailMenu(params: { id: string }) {
    try {
      const systemMenus = (await this.prisma.$queryRaw`
      WITH RECURSIVE subordinates AS (
        SELECT id, name, tbl_menus_id, "createdAt", "updatedAt", 1 as level
        FROM "SystemMenu" 
        WHERE id = ${params.id}
        
        UNION ALL
        
        SELECT e.id, e.name, e.tbl_menus_id, e."createdAt", e."updatedAt", s.level + 1
        FROM "SystemMenu" e
        INNER JOIN subordinates s ON s.id = e.tbl_menus_id
      )
      SELECT 
      *
      FROM subordinates
      ORDER BY level DESC, "createdAt";
      `) as DetailMenu[];

      const data: (SystemMenu & {
        children: SystemMenu[];
      })[] = [];

      for (let index = 0; index < systemMenus.length; index++) {
        const item = systemMenus[index];
        data.push({
          id: item.id,
          children: [],
          parentId: item.tbl_menus_id,
          createdAt: item.createdAt,
          name: item.name,
          updatedAt: item.updatedAt,
        });
      }

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (!element.parentId) continue;

        const foundIndex = data.findIndex(
          (item) => item.id === element.parentId,
        );
        if (foundIndex < 0) continue;

        data[foundIndex].children.push(element);
      }

      return {
        ok: true,
        data: data.filter((item) => !item.parentId),
      };
    } catch (error) {
      console.log(error);
      return { ok: false, message: 'something went wrong' };
    }
  }

  async retrieveMenus() {
    try {
      const data = await this.prisma.systemMenu.findMany({
        orderBy: { createdAt: 'asc' },
      });
      return { ok: true, data };
    } catch (error) {
      return { ok: false, message: 'something went wrong' };
    }
  }

  async removeMenu(params: DeleteMenuDto) {
    try {
      await this.prisma.systemMenu.delete({ where: { id: params.id } });
      return { ok: true };
    } catch (error) {
      return { ok: false, message: 'something went wrong' };
    }
  }

  async insert(params: CreateMenuDto) {
    try {
      await this.prisma.systemMenu.create({
        data: {
          createdAt: generateEpochSecond(),
          name: params.name,
          parentId: params.parentId,
        },
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: 'something went wrong' };
    }
  }

  async update(params: UpdateMenuDto) {
    try {
      await this.prisma.systemMenu.update({
        where: { id: params.id },
        data: { name: params.name },
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, message: 'something went wrong' };
    }
  }
}
