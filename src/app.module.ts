import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { LoginModule } from "./login/login.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      // process.env.NODE_ENV === "development" ? ".env.dev" : ".env.test",
    }),
    UserModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
