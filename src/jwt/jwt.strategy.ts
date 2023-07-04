import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { UserService } from "~/user/user.service";
import { JwtPayloadDto } from "./jwt.dto";
import { ProfilesService } from "../profiles/profiles.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly user: UserService,
    private readonly profile: ProfilesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("ACCESS_SECRET"),
    });
  }

  async validate({ userId, profileId }: JwtPayloadDto): Promise<JwtPayloadDto> {
    const user = await this.user.get(userId);
    if (!user) {
      throw new UnauthorizedException("접근 오류");
    }
    if (profileId) {
      const profile = await this.profile.isUserOwnProfile(userId, profileId);
      if (profile) return { userId, profileId };
    }
    return { userId }; // request.user에 해당 내용을 넣어준다 (Passport 라이브러리가 해줌)
  }
}
