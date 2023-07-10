import { ValidateNested } from "class-validator";
import { IntersectionType, PartialType } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IdDto } from "~/dto/abstract.dto";
import {
  TagNameDto,
  TagInfoDto,
  TagIdDto,
  ProfIdDto,
} from "~/dto/property.dto";

class NameAndInfoDto extends IntersectionType(TagNameDto, TagInfoDto) {}
export class CreateDto
  extends NameAndInfoDto
  implements Prisma.TagUncheckedCreateInput {}
export class WhereUniqueDto
  extends IdDto
  implements Prisma.TagWhereUniqueInput {}
export class ReadDto extends WhereUniqueDto {}

class NameOrInfoDto extends PartialType(NameAndInfoDto) {}
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

export class SearchDto implements Prisma.TagWhereInput {
  @ValidateNested({ each: true })
  readonly OR: Prisma.TagWhereInput[];
}

export class SubscribeDto
  extends IntersectionType(TagIdDto, ProfIdDto)
  implements Prisma.SubscribesUncheckedCreateInput {}
