import { IsString } from "class-validator";

export class MessageDto {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly text: string;
}

