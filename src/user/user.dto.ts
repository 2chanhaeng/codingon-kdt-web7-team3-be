import { IsString } from "class-validator";

export class UserAuthDto {
  @IsString()
  id: string;

  @IsString()
  salt: string;

  @IsString()
  password: string;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class LoginUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
