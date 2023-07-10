import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { Jwt } from "~/jwt/jwt.decorator";
import { PostsService } from "./posts.service";
import { PostDto, PatchBodyDto } from "./posts.dto";

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

  /**
   * `GET /posts`: 유저가 구독한 태그나 유저의 게시물 조회
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get()
  async getPostsOfSubscribesAndFollows(
    @Jwt("profileId") id: string,
    @Query("cursor") cursor: string,
  ) {
    return this.posts.readsSubscribesAndFollows(id, cursor);
  }

  /**
   * `GET /posts/:id`: 게시물 조회
   */
  @Get(":id")
  async getPost(@Param("id") id: string) {
    return this.posts.read({ id });
  }

  /**
   * `PATCH /posts/:id`: 게시물 수정
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async patch(
    @Jwt("profileId") profileId: string,
    @Param("id") id: string,
    @Body() body: PatchBodyDto,
  ) {
    return this.posts.updatePost(profileId, { id, ...body });
  }

  /**
   * `DELETE /posts/:id`: 게시물 삭제
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Jwt("profileId") profileId: string, @Param("id") id: string) {
    return this.posts.deletePost(profileId, id);
  }
}
