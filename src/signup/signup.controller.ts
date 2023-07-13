import { Controller, Post, Body } from "@nestjs/common";
import { SignupService } from "./signup.service";
import { SignupUserDto } from "~/user/user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Signup")
@Controller("signup")
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async create(@Body() body: SignupUserDto) {
    try {
      return this.signupService.signup(body);
    } catch (e) {
      console.log(e);
    }
  }
}
