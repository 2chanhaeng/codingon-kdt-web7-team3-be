import { IsString } from "class-validator";
import { IntersectionType, PartialType } from "@nestjs/swagger";
import { UserIdDto, ProfileIdDto, AccessDto } from "@/src/dto/property.dto";

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
export class JwtResDto extends AccessDto {}
export class JwtUserDto extends UserIdDto {}
export class JwtProfileDto extends IntersectionType(UserIdDto, ProfileIdDto) {}
export class JwtMaybeProfileDto extends IntersectionType(
  UserIdDto,
  PartialType(ProfileIdDto),
) {}
