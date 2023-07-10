import {
  Controller,
  Post,
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
}
