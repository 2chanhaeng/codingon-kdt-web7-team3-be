import { IsString } from "class-validator";
import { Prisma } from "@prisma/client";

/** 프로필 생성 DTO */
export class FollowsDto implements Prisma.FollowsFromIdToIdCompoundUniqueInput {
  @IsString()
  readonly fromId: string;

  @IsString()
  readonly toId: string;
}
