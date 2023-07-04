import { Controller, UseGuards, Post, Req, Get, Param } from "@nestjs/common";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { ProfilesService } from "./profiles.service";
import { CreateReqDto, LoginReqDto } from "./dto/profiles.dto";

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
    const { id: userId } = user;
    return this.profiles.create({ userId, information });
  }

  /**
   * `GET /profiles`: 현재 로그인된 유저의 모든 프로필 조회
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getByUserId(@Req() { user: { id: userId } }: LoginReqDto) {
    return this.profiles.getByUserId(userId);
  }

  /**
   * `GET /profiles/famous`: 구독 수가 많은 순서대로 정렬된 프로필 조회
   */
  @Get("famous")
  async getFamous() {
    return this.profiles.getByFollowersCountRankings();
  }
}
