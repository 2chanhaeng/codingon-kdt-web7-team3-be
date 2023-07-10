import { IntersectionType, PartialType } from "@nestjs/swagger";
import { ContentDto, TagsDto } from "~/dto/property.dto";
import { IdDto } from "../dto/abstract.dto";

export class PostDto extends IntersectionType(ContentDto, TagsDto) {}
export class PatchBodyDto extends PartialType(PostDto) {}
export class PatchDto extends IntersectionType(IdDto, PatchBodyDto) {}
export class DeleteDto extends IdDto {}
