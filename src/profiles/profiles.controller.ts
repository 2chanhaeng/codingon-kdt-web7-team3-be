import { Controller, UseGuards, Post, Req } from "@nestjs/common";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { ProfilesService } from "./profiles.service";
import { CreateReqDto } from "./dto/profiles.dto";

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
}
