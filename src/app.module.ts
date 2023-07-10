import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { LoginModule } from "./login/login.module";
import { SignupModule } from "./signup/signup.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ChatsModule } from "./chats/chats.module";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      // process.env.NODE_ENV === "development" ? ".env.dev" : ".env.test",
    }),
    UserModule,
    LoginModule,
    SignupModule,
    ProfilesModule,
    PrismaModule,
    ChatsModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
