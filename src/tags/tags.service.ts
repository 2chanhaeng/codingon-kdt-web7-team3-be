import { Injectable } from "@nestjs/common";
import { PrismaService } from "~/prisma/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly db: PrismaService) {}

}
