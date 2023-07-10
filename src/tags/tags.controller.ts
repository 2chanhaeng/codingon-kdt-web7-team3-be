import {
  Controller,
  UseGuards,
  Post,
  Get,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { Jwt } from "~/jwt/jwt.decorator";
import { TagsService } from "./tags.service";
import { CreateDto } from "./tags.dto";

@ApiTags("Tags")
@Controller("tags")
export class TagsController {
  constructor(private readonly tags: TagsService) {}

  /** `POST /tags`: 태그 생성 */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateDto) {
    return await this.tags.createTag(body);
  }

  /** `GET /tag/:id`: 특정 태그 조회 */
  @Get(":id")
  async read(@Param("id") id: string) {
    return await this.tags.readTag(id);
  }

  /** `GET /tags`: 구독중인 태그 조회 */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get()
  async reads(@Jwt("profileId") id: string) {
    return await this.tags.readTags(id);
  }
}
