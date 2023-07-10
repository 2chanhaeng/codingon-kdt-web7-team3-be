import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PostsService } from "./posts.service";

@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private readonly posts: PostsService) {}
}
