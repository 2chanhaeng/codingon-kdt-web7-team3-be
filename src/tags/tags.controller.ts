import {
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Query,
  Patch,
  Body,
  Delete,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { Jwt } from "~/jwt/jwt.decorator";
import { TagsService } from "./tags.service";
import { CreateDto, UpdateBodyDto } from "./tags.dto";

@ApiTags("Tags")
@Controller("tags")
export class TagsController {
  constructor(private readonly tags: TagsService) {}

  /** `GET /tags/famous`: 구독중인 태그 조회 */
  @Get("famous")
  async readsFamous() {
    try {
      return await this.tags.readFamous();
    } catch (e) {
      console.log(e);
    }
  }

  /** `GET /tags/search?q=:q`: 태그 검색 */
  @Get("search")
  async search(@Query("q") q: string) {
    try {
      return await this.tags.searchTag(q);
    } catch (e) {
      console.log(e);
    }
  }

  /** `POST /tags`: 태그 생성 */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Jwt("profileId") profileId: string, @Body() body: CreateDto) {
    try {
      return await this.tags.createTagAndFollow(profileId, body);
    } catch (e) {
      console.log(e);
    }
  }

  /** `GET /tag/:id`: 특정 태그 조회 */
  @Get(":id")
  async read(@Param("id") id: string) {
    try {
      return await this.tags.readTag(id);
    } catch (e) {
      console.log(e);
    }
  }

  /** `GET /tags`: 구독중인 태그 조회 */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get()
  async reads(@Jwt("profileId") id: string) {
    try {
      return await this.tags.readTags(id);
    } catch (e) {
      console.log(e);
    }
  }
}

@ApiTags("Tag")
@Controller("tag")
export class TagController {
  constructor(private readonly tags: TagsService) {}

  /** `PATCH /tag/:id`: 태그 수정 */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(@Param("id") id: string, @Body() body: UpdateBodyDto) {
    try {
      return await this.tags.updateTag(id, body);
    } catch (e) {
      console.log(e);
    }
  }

  /** `DELETE /tag/:id`: 태그 삭제 */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    try {
      return await this.tags.deleteTag(id);
    } catch (e) {
      console.log(e);
    }
  }

  /** `GET /tag/:id/subscribe: 태그 구독 */
  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get(":id/subscribe")
  async subscribe(
    @Jwt("profileId") profileId: string,
    @Param("id") tagId: string,
  ) {
    try {
      return await this.tags.subscribeTag(profileId, tagId);
    } catch (e) {
      console.log(e);
    }
  }

  /** `GET /tag/:id/profiles?cursor=:cursor`: 태그 구독자 조회 */
  @Get(":id/profiles")
  async profiles(@Param("id") id: string, @Query("cursor") cursor?: string) {
    try {
      return await this.tags.getProfiles(id, cursor);
    } catch (e) {
      console.log(e);
    }
  }

  /** `GET /tag/:id/chats?cursor=:cursor`: 태그 주제 채팅방 조회 */
  @Get(":id/chats")
  async chats(@Param("id") id: string, @Query("cursor") cursor?: string) {
    try {
      return await this.tags.getChats(id, cursor);
    } catch (e) {
      console.log(e);
    }
  }

  /** `GET /tag/:id/posts?cursor=:cursor`: 태그 주제 게시글 조회 */
  @Get(":id/posts")
  async posts(@Param("id") id: string, @Query("cursor") cursor?: string) {
    try {
      return await this.tags.getPosts(id, cursor);
    } catch (e) {
      console.log(e);
    }
  }
}
