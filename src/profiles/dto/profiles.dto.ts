import { IsString, ValidateNested } from "class-validator";
import { Prisma } from "@prisma/client";
import { JwtPayloadDto } from "@/src/jwt/jwt.dto";

/** 프로필 생성 DTO */
export class CreateDto implements Prisma.ProfileUncheckedCreateInput {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly information: string;
}

class ReqBodyDto {
  // req.body : 요청의 body
  @IsString()
  readonly information: string;
}

export class CreateReqDto {
  @ValidateNested()
  readonly user: JwtPayloadDto;

  @ValidateNested()
  readonly body: ReqBodyDto;
}

/** 로그인한 유저의 ID만 추출하는 DTO */
export class LoginReqDto {
  @ValidateNested()
  readonly user: JwtPayloadDto;
}

export class FindDto implements Prisma.ProfileWhereUniqueInput {
  @IsString()
  readonly id: string;
}

export class UpdateDto implements Prisma.ProfileUncheckedUpdateInput {
  @IsString()
  readonly information: string;
}

class AsProfileDto {
  @IsString()
  readonly id: string;
}

export class AsReqDto {
  @ValidateNested()
  readonly user: JwtPayloadDto;

  @ValidateNested()
  readonly params: AsProfileDto;
}
