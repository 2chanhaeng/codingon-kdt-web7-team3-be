import { IsString } from "class-validator";
import { Prisma } from "@prisma/client";

/** 프로필 생성 DTO */
export class CreateProfileDto implements Prisma.ProfileUncheckedCreateInput {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly information: string;
}
