import { IsString, ValidateNested } from "class-validator";
import { Prisma } from "@prisma/client";

/** 프로필 생성 DTO */
export class CreateDto implements Prisma.ProfileUncheckedCreateInput {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly information: string;
}

class ReqUserDto {
  // req.user : JwtAuthGuard에서 자동으로 생성하는 객체
  @IsString()
  readonly id: string;
}

class ReqBodyDto {
  // req.body : 요청의 body
  @IsString()
  readonly information: string;
}

export class CreateReqDto {
  @ValidateNested()
  readonly user: ReqUserDto;

  @ValidateNested()
  readonly body: ReqBodyDto;
}

/** 로그인한 유저의 ID만 추출하는 DTO */
export class LoginReqDto {
  @ValidateNested()
  readonly user: ReqUserDto;
}

export class FindDto implements Prisma.ProfileWhereUniqueInput {
  @IsString()
  readonly id: string;
}

export class UpdateDto implements Prisma.ProfileUncheckedUpdateInput {
  @IsString()
  readonly information: string;
}
