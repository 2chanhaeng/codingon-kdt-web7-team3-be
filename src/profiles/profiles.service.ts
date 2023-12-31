import { Injectable } from "@nestjs/common";
import { Profile, Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "~/prisma/prisma.service";
import { CreateProfileDto, FindDto, UpdateDto } from "./dto/profiles.dto";
import { FollowsDto } from "./dto/follows.dto";

@Injectable()
export class ProfilesService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /** userId 유저의 모든 프로필 조회 */
  async getByUserId(userId: string): Promise<Profile[] | null> {
    const where = { userId };
    return await this.db.profile.findMany({ where });
  }

  /** 팔로워 수 순으로 프로필 조회 */
  async getByFollowersCountRankings(
    cursorId?: string,
  ): Promise<Profile[] | null> {
    const where = {};
    const take = 10;
    const skip = cursorId ? 1 : 0;
    const cursor = cursorId ? { id: cursorId } : undefined;
    const orderBy = { followers: { _count: Prisma.SortOrder.desc } };
    const findManyArgs = { where, take, skip, cursor, orderBy };
    return await this.db.profile.findMany(findManyArgs);
  }

  /** 현재 접속한 유저의 프로필 생성 */
  async create(data: CreateProfileDto) {
    return await this.db.profile.create({ data });
  }

  /** 현재 접속한 유저의 프로필 생성 */
  async createProfile(data: CreateProfileDto) {
    const select = { id: true };
    return await this.db.profile.create({ data, select });
  }

  /** 현재 접속한 프로필 정보 수정 */
  async update(where: FindDto, data: UpdateDto) {
    return await this.db.profile.update({ where, data });
  }

  /** id 프로필이 작성한 포스트 조회 */
  async getPosts(where: FindDto, cursorId?: string) {
    const take = 10;
    const skip = cursorId ? 1 : 0;
    const cursor = cursorId ? { id: cursorId } : undefined;
    const orderBy = { createdAt: Prisma.SortOrder.desc };
    const postsArgs = { take, skip, cursor, orderBy };
    return await this.db.profile.findUnique({ where }).posts(postsArgs);
  }

  /** id 프로필이 구독하고 있는 태그 조회 */
  async getTags(where: FindDto) {
    return await this.db.profile.findUnique({ where }).tags();
  }

  /** id 프로필이 구독하고 있는 유저 조회 */
  async getFollows(where: FindDto, cursorId?: FollowsDto) {
    const take = 10;
    const skip = cursorId ? 1 : 0;
    const cursor = cursorId ? { fromId_toId: cursorId } : undefined;
    const orderBy = { toId: Prisma.SortOrder.desc };
    const followsArgs = { take, skip, cursor, orderBy };
    return await this.db.profile.findUnique({ where }).follows(followsArgs);
  }

  /** id 프로필을 구독하고 있는 유저 조회 */
  async getFollowers(where: FindDto, cursorId: FollowsDto | null) {
    const take = 10;
    const skip = cursorId ? 1 : 0;
    const cursor = cursorId ? { fromId_toId: cursorId } : undefined;
    const orderBy = { fromId: Prisma.SortOrder.desc };
    const followersArgs = { take, skip, cursor, orderBy };
    return await this.db.profile.findUnique({ where }).followers(followersArgs);
  }

  /** fromId 가 toId 를 구독 */
  async follow(data: FollowsDto) {
    return await this.db.follows.create({ data });
  }

  /** userId의 유저가 id의 프로필을 가지고 있는지 확인 */
  async isUserOwnProfile(userId: string, id: string) {
    const where = { userProfile: { id, userId } };
    const select = { id: true };
    return await this.db.profile.findUnique({ where, select });
  }

  /** Access 토큰에 프로필 추가 */
  async addProfileToAccess(userId: string, profileId: string) {
    const owned = await this.isUserOwnProfile(userId, profileId);
    if (!owned) return {};
    const data = { userId, profileId };
    const access = this.jwt.sign(data, {
      secret: this.config.get<string>("ACCESS_SECRET"),
      expiresIn: "1y",
    });
    return { access };
  }

  /** id로 프로필 조회 */
  async get(id: string) {
    const where = { id };
    return await this.db.profile.findUnique({ where });
  }
}
