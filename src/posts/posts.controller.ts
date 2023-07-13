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
import { PostDto, PatchBodyDto, SearchDto } from "./posts.dto";
import { CursorQureyDto } from "../dto/abstract.dto";

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
    try {
      return this.posts.createPost(id, body);
    } catch (e) {
      console.log(e);
    }
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
    try {
      return this.posts.readsSubscribesAndFollows(id, cursor);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /posts/:id`: 게시물 조회
   */
  @Get(":id")
  async getPost(@Param("id") id: string) {
    try {
      return this.posts.read({ id });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `GET /posts`: 구독중인 태그와 프로필의 게시물 조회
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get()
  async getSubscribes(
    @Jwt("profileId") id: string,
    @Query() { cursor }: CursorQureyDto,
  ) {
    try {
      return this.posts.readsSubscribesAndFollows(id, cursor);
    } catch (e) {
      console.log(e);
    }
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
    try {
      return this.posts.updatePost(profileId, { id, ...body });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `DELETE /posts/:id`: 게시물 삭제
   */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Jwt("profileId") profileId: string, @Param("id") id: string) {
    try {
      return this.posts.deletePost(profileId, id);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * `POST /posts/search`: 게시물 검색
   * 태그 ID가 길고, 양이 많을 수 있으므로 POST로 처리
   */
  @Post("search")
  async search(@Body() { q, tags }: SearchDto) {
    try {
      return this.posts.searchPost(q, tags);
    } catch (e) {
      console.log(e);
    }
  }
}
