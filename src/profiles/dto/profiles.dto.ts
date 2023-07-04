import { IsString } from "class-validator";
import { Prisma } from "@prisma/client";

/** 프로필 생성 DTO */
export class CreateDto implements Prisma.ProfileUncheckedCreateInput {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly information: string;
}

export class FindDto implements Prisma.ProfileWhereUniqueInput {
  @IsString()
  readonly id: string;
}

export class UpdateDto implements Prisma.ProfileUncheckedUpdateInput {
  @IsString()
  readonly information: string;
}
