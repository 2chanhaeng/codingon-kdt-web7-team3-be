import { IntersectionType } from "@nestjs/swagger";
import { IdDto } from "~/dto/abstract.dto";
import { PasswordDto, SaltDto, UnPwDto } from "~/dto/property.dto";

export class SignupUserDto extends UnPwDto {}
export class LoginUserDto extends UnPwDto {}
export class UserAuthDto extends IntersectionType(
  IdDto,
  SaltDto,
  PasswordDto,
) {}
