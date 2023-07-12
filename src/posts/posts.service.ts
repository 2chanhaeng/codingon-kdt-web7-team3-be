import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "~/prisma/prisma.service";
import { PatchDto, PostDto } from "./posts.dto";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostUncheckedCreateInput) {
    return await this.prisma.post.create({
      data,
    });
  }

  async createPost(profileId: string, { tags, ...body }: PostDto) {
    const data = {
      profileId,
      tags: { connect: tags.map((id) => ({ id })) },
      ...body,
    };
    return await this.create(data);
  }

  async reads(data: Prisma.PostFindManyArgs) {
    try {
      return await this.prisma.post.findMany(data);
    } catch (e) {
      console.log(e);
      throw BadRequestException;
    }
  }

  async readsWithCursor(
    where: Prisma.PostWhereInput,
    cursor?: Prisma.PostWhereUniqueInput,
  ) {
    const take = 10;
    const skip = cursor ? 1 : 0;
    const orderBy = { createdAt: Prisma.SortOrder.desc };
    const findManyArgs = { take, skip, orderBy, where, cursor };
    return await this.prisma.post.findMany(findManyArgs);
  }

  async makeCursor(cursor: Prisma.PostWhereUniqueInput) {
    if (!cursor) return undefined;
    const take = 10;
    const skip = 1;
    const orderBy = { createdAt: Prisma.SortOrder.desc };
    return { take, skip, orderBy, cursor };
  }

  async readsSubscribesAndFollows(profileId: string, id: string) {
    const where = {
      OR: [
        { tags: { some: { profiles: { some: { id: profileId } } } } }, // 구독한 태그의 게시물
        { profile: { follows: { some: { fromId: profileId } } } }, // 구독한 유저의 게시물
      ],
    };
    const cursor = id ? { id } : undefined;
    return await this.reads(where, cursor);
  }

  async read(where: Prisma.PostWhereUniqueInput) {
    return await this.prisma.post.findUnique({
      where,
    });
  }

  async update(
    where: Prisma.PostWhereUniqueInput,
    data: Prisma.PostUncheckedUpdateInput,
  ) {
    return await this.prisma.post.update({
      where,
      data,
    });
  }

  async updatePost(id: string, { tags, ...body }: PatchDto) {
    const where = { id };
    const data = {
      tags: {
        connect: tags?.map((id) => ({ id })),
      },
      ...body,
    };
    return await this.update(where, data);
  }

  async delete(where: Prisma.PostWhereUniqueInput) {
    return await this.prisma.post.delete({
      where,
    });
  }

  async deletePost(profileId: string, id: string) {
    const where = { profileId, id };
    return await this.delete(where);
  }

  async search(where: Prisma.PostWhereInput) {
    return await this.prisma.post.findMany({ where });
  }

  async searchPost(q: string, tags: string[]) {
    return await this.search(this.keywordAndTags(q, tags));
  }

  keywordAndTags(q: string, tags: string[]) {
    return this.searchAnd(this.searchByTags(tags), this.searchByKeyword(q));
  }

  searchAnd(...where: Prisma.PostWhereInput[]) {
    return { AND: where };
  }

  searchByTags(tags: string[]) {
    return { tags: { some: { id: { in: tags } } } };
  }

  searchByKeyword(q: string) {
    return { content: { contains: q } };
  }
}
