import { IsString } from "class-validator";

export class UserAuthDto {
  @IsString()
  id: string;

  @IsString()
  salt: string;

  @IsString()
  password: string;
}
