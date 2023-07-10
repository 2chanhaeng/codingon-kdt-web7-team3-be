import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma/prisma.service";
import {
  CreateDto,
  WhereUniqueDto,
  SearchDto,
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

  async search(where: SearchDto) {
    return await this.db.tag.findMany({ where });
  }

  async searchTag(q: string) {
    return await this.search({ OR: this.searchTagOr(q) });
  }

  searchTagOr(q: string) {
    return [this.contains("tagname")(q), this.contains("information")(q)];
  }

  contains(attr: keyof Prisma.TagWhereInput) {
    return (q: string) => ({ [attr]: { contains: q } });
  }
}
