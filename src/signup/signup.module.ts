import { Module } from "@nestjs/common";
import { SignupController } from "./signup.controller";
import { PrismaService } from "~/prisma.service";
import { UserService } from "~/user/user.service";
import { SignupService } from "./signup.service";

@Module({
  controllers: [SignupController],
  providers: [SignupService, UserService, PrismaService],
})
export class SignupModule {}
