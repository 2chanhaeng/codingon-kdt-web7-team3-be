import { Controller, Post, Body } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginUserDto } from "~/user/user.dto";

@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() { username, password }: LoginUserDto) {
    return this.loginService.login(username, password);
  }
}
