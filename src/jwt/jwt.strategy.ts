import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { UserService } from "~/user/user.service";
import { JwtPayloadDto } from "./jwt.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("ACCESS_SECRET"),
    });
  }

  async validate({ id }: JwtPayloadDto) {
    const user = await this.userService.get(id);
    if (user) {
      return { id }; // request.user에 해당 내용을 넣어준다 (Passport 라이브러리가 해줌)
    } else {
      throw new UnauthorizedException("접근 오류");
    }
  }
}
