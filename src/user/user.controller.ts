import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { UsernameDto } from "~/dto/property.dto";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    try {
      return this.userService.users();
    } catch (e) {
      console.log(e);
    }
  }

  @ApiBearerAuth("access")
  @UseGuards(JwtAuthGuard)
  @Get(":username")
  async findOne(@Param() where: UsernameDto) {
    try {
      return this.userService.user(where);
    } catch (e) {
      console.log(e);
    }
  }
}
