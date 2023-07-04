import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { CreateUserDto } from "~/user/user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class SignupService {
  constructor(private readonly user: UserService) {}
  async create({ username, password: plain }: CreateUserDto) {
    const salt = crypto.randomBytes(16).toString("hex");
    const password = crypto
      .pbkdf2Sync(plain, salt, 1000, 64, "sha512")
      .toString("hex");
    const data = {
      username,
      password,
      salt,
    };
    return this.user.create(data);
  }
}