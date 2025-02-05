import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function start() {
  try {
    const PORT = process.env.PORT || 3030;

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle("Skidkachi.uz")
      // .setDescription("maqtash shart emas bilaman zo'r chiqan")
      .setVersion("Abdulaziz-dev-v006")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    await app.listen(PORT, () => {
      console.log("\n\n + ====================================================================== +");
      console.log(`| |                                                                      | | `);
      console.log(`| | 🚀             Server started at: http://localhost:${PORT}           🚀 | | `);
      console.log(`| |                                                                      | | `);
      console.log(`| | 📚  Swagger API documentation at: http://localhost:${PORT}/api/docs  📚 | |`);
      console.log(`| |                                                                      | | `);
      console.log(" + ====================================================================== +");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

start();
