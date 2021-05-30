import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  try {
    const options = new DocumentBuilder()
      .setTitle('freelance provider ERP')
      .setDescription('flp descriptions')
      .setVersion('1.0')
      .setBasePath('api')
      .addBearerAuth()
      .build();
    const app = await NestFactory.create(AppModule, { cors: true });
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    const port = process.env.PORT || 4004;
    await app.listen(port);
    console.log(`Listening on port ${port}!!`);
  } catch (error) {}
}
bootstrap();
