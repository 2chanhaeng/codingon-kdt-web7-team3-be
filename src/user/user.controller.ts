import * as crypto from "crypto";
import { Body, Controller, Get, Post, UseGuards, Param } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateUserDto } from "@/dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { username, password: plain }: CreateUserDto) {
    const salt = crypto.randomBytes(16).toString("hex");
    const password = crypto
      .pbkdf2Sync(plain, salt, 1000, 64, "sha512")
      .toString("hex");
    const data: Prisma.UserCreateInput = {
      username,
      password,
      salt,
    };
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.users();
  }
}
