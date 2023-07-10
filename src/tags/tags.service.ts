import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma/prisma.service";
import {
  CreateDto,
  WhereUniqueDto,
} from "./tags.dto";

@Injectable()
export class TagsService {
  constructor(private readonly db: PrismaService) {}

  async create(data: CreateDto) {
    const select = { id: true };
    return await this.db.tag.create({ data, select });
  }

  async createTag(data: CreateDto) {
    const tag = await this.create(data);
    return { success: !!tag };
  }

  async read(where: WhereUniqueDto) {
    return await this.db.tag.findUnique({ where });
  }

  async readTag(id: string) {
    return await this.read({ id });
  }
}
