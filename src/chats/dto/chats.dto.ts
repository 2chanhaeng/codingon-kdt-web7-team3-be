import { IsString } from "class-validator";

export class MessageDto {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly text: string;
}

export class RoomDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly roomname: string;
}
