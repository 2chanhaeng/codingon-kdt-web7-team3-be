import { Controller, Get, UseGuards, Param } from "@nestjs/common";
import { JwtAuthGuard } from "~/jwt/jwt.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.users();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":username")
  async findOne(@Param() where: { username: string }) {
    // DEBUG
    return this.userService.user(where);
  }
}
