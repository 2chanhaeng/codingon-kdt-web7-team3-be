import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../jwt/jwt.strategy";
import { UserService } from "~/user/user.service";
import { PrismaService } from "~/prisma.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({}),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy, UserService, PrismaService], // strategy 의존성 주입을 위해서
})
export class LoginModule {}
