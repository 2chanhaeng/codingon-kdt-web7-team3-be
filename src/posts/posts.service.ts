import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostUncheckedCreateInput) {
    return await this.prisma.post.create({
      data,
    });
  }

  async reads(where: Prisma.PostWhereInput) {
    return await this.prisma.post.findMany({
      where,
    });
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
}
