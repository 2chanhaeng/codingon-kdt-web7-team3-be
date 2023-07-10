import { IntersectionType, PartialType } from "@nestjs/swagger";
import { UserIdDto, ProfileIdDto, AccessDto } from "~/dto/property.dto";

export class JwtResDto extends AccessDto {}
export class JwtUserDto extends UserIdDto {}
export class JwtProfileDto extends IntersectionType(UserIdDto, ProfileIdDto) {}
export class JwtMaybeProfileDto extends IntersectionType(
  UserIdDto,
  PartialType(ProfileIdDto),
) {}
