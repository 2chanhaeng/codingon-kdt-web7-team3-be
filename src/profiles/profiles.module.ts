import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { ProfileController, ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";
import { LoginModule } from "~/login/login.module";

@Module({
  imports: [LoginModule],
  controllers: [ProfilesController, ProfileController],
  providers: [ProfilesService, PrismaService],
})
export class ProfilesModule {}
