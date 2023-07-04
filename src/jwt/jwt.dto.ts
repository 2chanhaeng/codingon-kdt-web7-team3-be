import { IsString } from "class-validator";

export class JwtDto {
  @IsString()
  id: string;
}

export class JwtPayloadDto {
  @IsString()
  id: string;
}
