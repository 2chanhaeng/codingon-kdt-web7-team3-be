import {
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Query,
  Patch,
  Body,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { Jwt } from "~/jwt/jwt.decorator";
import { CreateProfBodyDto, UpdateDto } from "./dto/profiles.dto";
import { ProfilesService } from "./profiles.service";

@ApiTags("Profiles")
@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profiles: ProfilesService) {}

  /**
   * `POST /profiles`: 프로필 생성
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Jwt("userId") id: string, @Body() body: CreateProfBodyDto) {
    try {
      return this.profiles.create({ userId: id, ...body });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `PATCH /profiles`: 프로필 수정
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Jwt("profileId") id: string, @Body() body: UpdateDto) {
    try {
      return this.profiles.update({ id }, body);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profiles`: 현재 로그인된 유저의 모든 프로필 조회
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUserId(@Jwt("userId") id: string) {
    try {
      return this.profiles.getByUserId(id);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profiles/famous?cursor=:cursor`: 구독 수가 많은 순서대로 정렬된 프로필 조회
   */
  @Get("famous")
  async getFamousWithCursor(@Query("cursor") cursor: string) {
    try {
      return this.profiles.getByFollowersCountRankings(cursor);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profiles/as/:id`: id 프로필로 접속
   * 기존의 Access 토큰 속 유저가 프로필을 소유하고 있는지 확인한 후
   * 소유한다면 Access 토큰에 프로필을 추가하여 반환
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get("as/:id")
  async connectAs(
    @Jwt("userId") userId: string,
    @Param("id") profileId: string,
  ) {
    try {
      return this.profiles.addProfileToAccess(userId, profileId);
    } catch (e) {
      console.log(e);
    }
  }
}

@ApiTags("Profile")
@Controller("profile/:id")
export class ProfileController {
  constructor(private readonly profiles: ProfilesService) {}

  /**
   * `GET /profile/:id`: id 프로필 조회
   */
  @Get()
  async get(@Param("id") id: string) {
    try {
      return this.profiles.get(id);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profile/:id/posts?cursor=:cursor`: id 프로필이 작성한 포스트 조회
   */
  @Get("posts")
  async getPosts(@Param("id") id: string, @Query("cursor") cursor?: string) {
    try {
      return this.profiles.getPosts({ id }, cursor);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profile/:id/tags`: id 프로필이 구독하고 있는 태그 조회
   */
  @Get("tags")
  async getTags(@Param("id") id: string) {
    try {
      return this.profiles.getTags({ id });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profile/:id/follows?cursor=:cursor`: id 프로필이 구독하고 있는 유저 조회
   */
  @Get("follows")
  async getFollows(@Param("id") id: string, @Query("cursor") cursor?: string) {
    try {
      const cursorId = cursor ? { fromId: id, toId: cursor } : undefined;
      return this.profiles.getFollows({ id }, cursorId);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profile/:id/followers?cursor=:cursor`: id 프로필을 구독하고 있는 유저 조회
   */
  @Get("followers")
  async getFollowers(
    @Param("id") id: string,
    @Query("cursor") cursor?: string,
  ) {
    try {
      const cursorId = cursor ? { fromId: cursor, toId: id } : undefined;
      return this.profiles.getFollows({ id }, cursorId);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /profile/:id/follow`: id 프로필을 구독
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get("follow")
  async follow(@Jwt("userId") fromId: string, @Param("id") toId: string) {
    try {
      return this.profiles.follow({ fromId, toId });
    } catch (e) {
      console.log(e);
    }
  }
}
