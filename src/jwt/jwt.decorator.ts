import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtMaybeProfileDto } from "./jwt.dto";

export const Jwt = createParamDecorator(
  (data: "userId" | "profileId", ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? (user?.[data] as string) : (user as JwtMaybeProfileDto);
  },
);
