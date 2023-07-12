import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginService } from "./login.service";
import { LoginUserDto } from "~/user/user.dto";

@ApiTags("Login")
@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() { username, password }: LoginUserDto) {
    return this.loginService.login(username, password);
  }
}
