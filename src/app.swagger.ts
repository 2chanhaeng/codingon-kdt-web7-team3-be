import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
  .setTitle("Swagger Example")
  .setDescription("Swagger study API description")
  .setVersion("1.0.0")
  .addTag("swagger")
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      name: "JWT",
      in: "header",
    },
    "access",
  )
  .build();
