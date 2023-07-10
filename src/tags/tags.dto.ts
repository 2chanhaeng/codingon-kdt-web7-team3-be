import { IntersectionType, PartialType } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IdDto } from "~/dto/abstract.dto";
import { TagNameDto, TagInfoDto } from "~/dto/property.dto";

class NameAndInfoDto extends IntersectionType(TagNameDto, TagInfoDto) {}
export class CreateDto
  extends NameAndInfoDto
  implements Prisma.TagUncheckedCreateInput {}
export class WhereUniqueDto
  extends IdDto
  implements Prisma.TagWhereUniqueInput {}
export class ReadDto extends WhereUniqueDto {}

class NameOrInfoDto extends PartialType(NameAndInfoDto) {}
export class SearchDto extends NameOrInfoDto implements Prisma.TagWhereInput {}
export class UpdateBodyDto
  extends NameOrInfoDto
  implements Prisma.TagUncheckedUpdateInput {}
export class UpdateDataDto
  extends NameOrInfoDto
  implements Prisma.TagUncheckedUpdateInput {}

class NameOrInfoAndIdDto extends IntersectionType(IdDto, NameOrInfoDto) {}
export class UpdateDto
  extends NameOrInfoAndIdDto
  implements Prisma.TagUncheckedUpdateInput {}

export class DeleteDto extends IdDto implements Prisma.TagWhereUniqueInput {}
