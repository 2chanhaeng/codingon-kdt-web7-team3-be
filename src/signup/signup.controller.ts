import { Controller, Post, Body } from "@nestjs/common";
import { SignupService } from "./signup.service";
import { CreateUserDto } from "~/user/user.dto";

@Controller("signup")
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.signupService.create(body);
  }
}
