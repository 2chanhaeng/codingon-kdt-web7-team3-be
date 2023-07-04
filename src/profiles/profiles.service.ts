import { Injectable } from "@nestjs/common";
import { Profile, Prisma } from "@prisma/client";
import { PrismaService } from "~/prisma.service";
import { CreateProfileDto } from "./profiles.dto";

@Injectable()
export class ProfilesService {
  constructor(private readonly db: PrismaService) {}

  /** userId 유저의 모든 프로필 조회 */
  async getByUserId(userId: string): Promise<Profile[] | null> {
    const where = { userId };
    return await this.db.profile.findMany({ where });
  }

  /** 팔로워 수 순으로 프로필 조회 */
  async getByFollowersCountRankings(
    cursorId: string | null,
  ): Promise<Profile[] | null> {
    const where = {};
    const take = 10;
    const skip = cursorId ? 1 : 0;
    const cursor = cursorId ? { id: cursorId } : undefined;
    const orderBy = { followers: { _count: Prisma.SortOrder.desc } };
    const findManyArgs = { where, take, skip, cursor, orderBy };
    return await this.db.profile.findMany(findManyArgs);
  }

  async create(data: CreateProfileDto): Promise<{ id: string }> {
    const select = { id: true };
    return await this.db.profile.create({ data, select });
  }
}
