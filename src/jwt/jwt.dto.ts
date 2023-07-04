import { IsString } from "class-validator";

export class JwtLoginDto {
  @IsString()
  userId: string;
}

export class JwtPayloadDto {
  @IsString()
  userId: string;

  @IsString()
  profileId?: string;
}
