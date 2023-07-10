import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { Jwt } from "~/jwt/jwt.decorator";
import { PostsService } from "./posts.service";
import { PostDto } from "./posts.dto";

@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  /**
   * `POST /posts`: 게시물 생성
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Jwt("profileId") id: string, @Body() body: PostDto) {
    return this.posts.createPost(id, body);
  }
}
