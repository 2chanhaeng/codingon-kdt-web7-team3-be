import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaModule } from "~/prisma/prisma.module";
import { ProfileController, ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";

@Module({
  imports: [PrismaModule],
  controllers: [ProfilesController, ProfileController],
  providers: [ProfilesService, JwtService, ConfigService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
