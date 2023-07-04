import { Injectable } from "@nestjs/common";
import { Profile } from "@prisma/client";
import { PrismaService } from "~/prisma.service";

@Injectable()
export class ProfilesService {
  constructor(private readonly db: PrismaService) {}

  /** userId 유저의 모든 프로필 조회 */
  async getByUserId(userId: string): Promise<Profile[] | null> {
    const where = { userId };
    return this.db.profile.findMany({ where });
  }
}
