import { Prisma } from "@prisma/client";
import { IntersectionType, PartialType } from "@nestjs/swagger";
import { UserIdDto } from "~/dto/property.dto";
import { IdDto } from "~/dto/abstract.dto";
import { ProfInfoDto, ProfNameDto } from "./property.dto";

/** 프로필 생성 DTO */
class ProfNameInfoDto extends IntersectionType(ProfNameDto, ProfInfoDto) {}
export class CreateProfileDto
  extends IntersectionType(UserIdDto, ProfNameInfoDto)
  implements Prisma.ProfileUncheckedCreateInput {}

class UpdateAllPropsDto extends IntersectionType(ProfNameDto, ProfInfoDto) {}

export class UpdateDto
  extends PartialType(UpdateAllPropsDto)
  implements Prisma.ProfileUncheckedUpdateInput {}

export class FindDto extends IdDto implements Prisma.ProfileWhereUniqueInput {}
export class SelectProfDto extends FindDto {}
