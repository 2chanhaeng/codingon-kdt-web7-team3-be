import { Module } from "@nestjs/common";
import { PrismaService } from "~/prisma.service";
import { ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";
import { LoginModule } from "~/login/login.module";

@Module({
  imports: [LoginModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService],
})
export class ProfilesModule {}
