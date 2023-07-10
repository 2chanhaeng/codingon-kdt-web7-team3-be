import { genString } from "@/utils/example";
import { ApiProperty } from "@nestjs/swagger";

export class IdDto {
  @ApiProperty({
    description: "ID(UUID)",
    example: "123e4567-e89b-12d3-a456-426614174000",
    type: String,
  })
  readonly id: string;
}

export class InfoDto {
  @ApiProperty({
    description: "정보",
    example: genString(),
    type: String,
  })
  readonly information: string;
}

export class QueryDto {
  @ApiProperty({
    description: "검색어",
    example: genString(),
    type: String,
  })
  readonly q: string;
}
