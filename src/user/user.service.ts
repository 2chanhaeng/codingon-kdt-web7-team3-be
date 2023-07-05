import { Injectable } from "@nestjs/common";
import { User, Prisma } from "@prisma/client";
import { PrismaService } from "@/src/prisma/prisma.service";
import { UserAuthDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async user(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    // DEBUG
    return await this.db.user.findUnique({
      where,
    });
  }
  async get(id: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { id } });
  }

  async users() {
    // DEBUG
    return await this.db.user.findMany({
      where: {},
    });
  }

  async auth(id: string): Promise<User | null> {
    return await this.db.user.findUnique({
      where: { id },
    });
  }

  async login(where: Prisma.UserWhereUniqueInput, select: Prisma.UserSelect) {
    return (await this.db.user.findUnique({
      where,
      select,
    })) as UserAuthDto;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.db.user.create({
      data,
    });
    return { success: !!user };
  }
}
