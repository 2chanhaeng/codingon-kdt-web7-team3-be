import * as crypto from "crypto";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "~/user/user.service";
import { JwtLoginDto } from "~/jwt/jwt.dto";

@Injectable()
export class LoginService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly user: UserService,
  ) {}

  async login(username: string, plain: string) {
    const where = { username };
    const select = { id: true, password: true, salt: true };
    const user = await this.user.login(where, select);
    if (!user) return {};
    const { id, salt, password } = user;
    const hash = crypto
      .pbkdf2Sync(plain, salt, 1000, 64, "sha512")
      .toString("hex");
    if (hash !== password) return {};
    return this.genAccess({ userId: id });
  }

  genAccess(jwtDto: JwtLoginDto) {
    const access = this.jwt.sign(jwtDto, {
      secret: this.config.get<string>("ACCESS_SECRET"),
      expiresIn: "1y",
    });
    return { access };
  }
}
