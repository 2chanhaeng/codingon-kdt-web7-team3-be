import { genString } from "@/utils/test";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ProfNameDto {
  @ApiProperty({
    description: "프로필 이름",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly profname: string;
}

export class ProfInfoDto {
  @ApiProperty({
    description: "프로필 정보",
    example: genString(),
    type: String,
  })
  @IsString()
  readonly information: string;
}
