import { IsString, IsUUID } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { genString, genUuid } from "@/utils/example";
import { InfoDto } from "./abstract.dto";

export class UserIdDto {
  @ApiProperty({
    description: "유저의 ID(UUID)",
    example: genUuid(),
    type: String,
  })
  @IsUUID()
  readonly userId: string;
}

export class ProfileIdDto {
  @ApiProperty({
    description: "프로필 ID(UUID)",
    example: genUuid(),
    type: String,
  })
  @IsUUID()
  readonly profileId: string;
}

export class UsernameDto {
  @ApiProperty({
    description: "유저의 username",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly username: string;
}

export class PasswordDto {
  @ApiProperty({
    description: "유저의 password(평문)",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly password: string;
}

export class UnPwDto extends IntersectionType(UsernameDto, PasswordDto) {}

export class SaltDto {
  @ApiProperty({
    description: "유저의 salt(랜덤 문자열)",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly salt: string;
}

export class AccessDto {
  @ApiProperty({
    description: "유저의 access token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ODk4OTg2MC00NWVhLTQ3NTMtOTQyZC03ZTZmNzhiOTEwZTEiLCJpYXQiOjE2ODg5NTU5NjksImV4cCI6MTcyMDUxMzU2OX0.Wery0qRhS60DYiJjwfnVRyrAhutNoTg_0gA3_3Y1o4I",
    type: String,
  })
  @IsString()
  readonly access: string;
}

export class ContentDto {
  @ApiProperty({
    description: "게시물의 내용",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly content: string;
}

export class TagsDto {
  @ApiProperty({
    description: "게시물의 태그",
    example: [genUuid(), genUuid()],
    type: [String],
  })
  @IsUUID("all", { each: true })
  readonly tags: string[];
}

export class TagNameDto {
  @ApiProperty({
    description: "태그의 이름",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly tagname: string;
}

export class TagInfoDto extends InfoDto {
  @ApiProperty({
    description: "태그의 정보",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly information: string;
}

export class TagIdDto {
  @ApiProperty({
    description: "태그의 ID(UUID)",
    example: genUuid(),
    type: String,
  })
  @IsUUID()
  readonly tagId: string;
}

export class ProfIdDto {
  @ApiProperty({
    description: "프로필의 ID(UUID)",
    example: genUuid(),
    type: String,
  })
  @IsUUID()
  readonly profileId: string;
}
