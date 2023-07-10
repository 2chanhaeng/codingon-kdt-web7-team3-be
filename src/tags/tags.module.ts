import { Module } from "@nestjs/common";
import { PrismaModule } from "~/prisma/prisma.module";
import { TagsController, TagController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
  imports: [PrismaModule],
  controllers: [TagsController, TagController],
  providers: [TagsService],
})
export class TagsModule {}
