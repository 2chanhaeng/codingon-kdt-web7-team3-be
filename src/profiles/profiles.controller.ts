import {
  Controller,
  UseGuards,
  Post,
  Req,
  Get,
  Param,
  Query,
  Patch,
} from "@nestjs/common";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { ProfilesService } from "./profiles.service";
import {
  AsReqDto,
  CreateReqDto,
  FollowReqDto,
  LoginReqDto,
  UpdateReqDto,
} from "./dto/profiles.dto";

@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profiles: ProfilesService) {}

  /**
   * `POST /profiles`: 프로필 생성
   *
   * 요청의 user에서 userId(JwtAuthGuard에 의해 생성됨),
   * body에서 information을 추출하여 프로필 생성
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() { body, user }: CreateReqDto) {
    const { information } = body;
    const { userId } = user;
    return this.profiles.create({ userId, information });
  }

  /**
   * `PATCH /profiles`: 프로필 수정
   */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() { body: data, user }: UpdateReqDto) {
    const { userId: id } = user;
    return this.profiles.update({ id }, data);
  }

  /**
   * `GET /profiles`: 현재 로그인된 유저의 모든 프로필 조회
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUserId(@Req() { user: { userId } }: LoginReqDto) {
    return this.profiles.getByUserId(userId);
  }

  /**
   * `GET /profiles/famous?cursor=:cursor`: 구독 수가 많은 순서대로 정렬된 프로필 조회
   */
  @Get("famous")
  async getFamousWithCursor(@Query("cursor") cursor: string) {
    return this.profiles.getByFollowersCountRankings(cursor);
  }

  /**
   * `GET /profiles/as/:id`: id 프로필로 접속
   * 기존의 Access 토큰 속 유저가 프로필을 소유하고 있는지 확인한 후
   * 소유한다면 Access 토큰에 프로필을 추가하여 반환
   */
  @UseGuards(JwtAuthGuard)
  @Get("as/:id")
  async connectAs(@Req() { params, user }: AsReqDto) {
    const { id } = params; // URL 파라미터에서 프로필 ID 추출
    const { userId } = user; // ACCESS 토큰에서 유저 ID 추출
    // 유저가 프로필을 소유하고 있는지 확인
    const owned = await this.profiles.isUserOwnProfile(userId, id);
    // 소유하지 않는다면 빈 객체 반환
    if (!owned) return {};
    // 소유한다면 Access 토큰에 프로필 ID 추가
    return this.profiles.addProfileToAccess(userId, id);
  }
}

@Controller("profile/:id")
export class ProfileController {
  constructor(private readonly profiles: ProfilesService) {}

  /**
   * `GET /profile/:id`: id 프로필 조회
   */
  @Get()
  async get(@Param("id") id: string) {
    return this.profiles.get(id);
  }

  /**
   * `GET /profile/:id/posts?cursor=:cursor`: id 프로필이 작성한 포스트 조회
   */
  @Get("posts")
  async getPosts(@Param("id") id: string, @Query("cursor") cursor?: string) {
    return this.profiles.getPosts({ id }, cursor);
  }

  /**
   * `GET /profile/:id/tags`: id 프로필이 구독하고 있는 태그 조회
   */
  @Get("tags")
  async getTags(@Param("id") id: string) {
    return this.profiles.getTags({ id });
  }

  /**
   * `GET /profile/:id/follows?cursor=:cursor`: id 프로필이 구독하고 있는 유저 조회
   */
  @Get("follows")
  async getFollows(@Param("id") id: string, @Query("cursor") cursor?: string) {
    const cursorId = cursor ? { fromId: id, toId: cursor } : undefined;
    return this.profiles.getFollows({ id }, cursorId);
  }

  /**
   * `GET /profile/:id/followers?cursor=:cursor`: id 프로필을 구독하고 있는 유저 조회
   */
  @Get("followers")
  async getFollowers(
    @Param("id") id: string,
    @Query("cursor") cursor?: string,
  ) {
    const cursorId = cursor ? { fromId: cursor, toId: id } : undefined;
    return this.profiles.getFollows({ id }, cursorId);
  }

  /**
   * `GET /profile/:id/follow`: id 프로필을 구독
   */
  @UseGuards(JwtAuthGuard)
  @Get("follow")
  async follow(@Req() { params, user }: FollowReqDto) {
    const { id: toId } = params;
    const { userId: fromId } = user;
    return this.profiles.follow({ fromId, toId });
  }
}
