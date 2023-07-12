import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "~/user/user.module";
import { JwtStrategy } from "~/jwt/jwt.strategy";
import { ProfilesModule } from "~/profiles/profiles.module";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.register({}),
    UserModule,
    ProfilesModule,
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy],
  exports: [LoginService],
})
export class LoginModule {}
