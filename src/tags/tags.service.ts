import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma/prisma.service";
import {
  CreateDto,
  DeleteDto,
  WhereUniqueDto,
  UpdateBodyDto,
  UpdateDataDto,
  SearchDto,
  SubscribeDto,
} from "./tags.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TagsService {
  constructor(private readonly db: PrismaService) {}

  async create(data: CreateDto) {
    const select = { id: true };
    return await this.db.tag.create({ data, select });
  }

  async createTagAndFollow(profileId: string, data: CreateDto) {
    const tag = await this.create(data);
    if (tag) await this.subscribeTag(profileId, tag.id);
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

  async readTags(profileId: string) {
    const where = { subscribes: { some: { profileId } } };
    return await this.db.tag.findMany({ where });
  }

  async readFamous() {
    const select: Prisma.TagSelect = {
      id: true,
      tagname: true,
      information: true,
      _count: {
        select: {
          subscribes: true,
        },
      },
    };
    const orderBy: Prisma.TagOrderByWithRelationInput = {
      subscribes: { _count: Prisma.SortOrder.desc },
    };
    const tags = await this.db.tag.findMany({ select, orderBy });
    return tags.map(({ _count, ...tag }) => ({
      count: _count.subscribes,
      ...tag,
    }));
  }

  async update(where: WhereUniqueDto, data: UpdateDataDto) {
    return await this.db.tag.update({ where, data });
  }

  async updateTag(id: string, data: UpdateBodyDto) {
    const tag = await this.update({ id }, data);
    return { success: !!tag };
  }

  async delete(where: DeleteDto) {
    return await this.db.tag.delete({ where });
  }

  async deleteTag(id: string) {
    return await this.delete({ id });
  }

  async getPosts(tagId: string, cursorId?: string) {
    const where = { id: tagId };
    const take = 10;
    const skip = cursorId ? 1 : 0;
    const cursor = cursorId ? { id: cursorId } : undefined;
    const orderBy = { createdAt: Prisma.SortOrder.desc };
    const select = {
      id: true,
      content: true,
      profile: { select: { id: true, profname: true } },
    };
    const postsArgs = { take, skip, cursor, orderBy, select };
    return await this.db.tag.findUnique({ where }).posts(postsArgs);
  }

  async getProfiles(tagId: string, profileId?: string) {
    const where = { id: tagId };
    const take = 10;
    const skip = profileId ? 1 : 0;
    const cursor = profileId && { profile_tag: { tagId, profileId } };
    const orderBy = {
      profile: { followers: { _count: Prisma.SortOrder.desc } },
    };
    const select = {
      profile: { select: { id: true, profname: true, information: true } },
    };
    const profilesArgs = { take, skip, cursor, orderBy, select };
    const subscribers = await this.db.tag
      .findUnique({ where })
      .subscribes(profilesArgs);
    const profiles = subscribers.map(({ profile }) => profile);
    return profiles;
  }

  async getChats(tagId: string, chatroomId?: string) {
    const where = { id: tagId };
    const take = 10;
    const skip = chatroomId ? 1 : 0;
    const cursor = chatroomId && { id: { tagId, chatroomId } };
    const orderBy = {
      chatroom: {
        chatters: {
          _count: Prisma.SortOrder.desc,
        },
      },
    };
    const select: Prisma.SubjectsSelect = { chatroom: true };
    const chatroomsArgs = { take, skip, cursor, orderBy, select };
    return await this.db.tag.findUnique({ where }).subjects(chatroomsArgs);
  }

  async subscribe(data: SubscribeDto) {
    return await this.db.subscribes.create({ data });
  }

  async subscribeTag(profileId: string, tagId: string) {
    return await this.subscribe({ profileId, tagId });
  }
}
