import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { warn } from 'console';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  // ╦ ╦╔═╗╔═╗  ╔═╗╦  ╔═╗╔╗ ╔═╗╦    ╔═╗╦╔═╗╔═╗╔═╗
  // ║ ║╚═╗║╣   ║ ╦║  ║ ║╠╩╗╠═╣║    ╠═╝║╠═╝║╣ ╚═╗
  // ╚═╝╚═╝╚═╝  ╚═╝╩═╝╚═╝╚═╝╩ ╩╩═╝  ╩  ╩╩  ╚═╝╚═╝
  app.useGlobalPipes(new ValidationPipe({
    validationError: { target: false, value: false },
  }));

  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
  app.enableCors();

  // ╔═╗╦ ╦╔═╗╔═╗╔═╗╔═╗╦═╗
  // ╚═╗║║║╠═╣║ ╦║ ╦║╣ ╠╦╝
  // ╚═╝╚╩╝╩ ╩╚═╝╚═╝╚═╝╩╚═
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [
      UserModule,
      CompanyModule,
      JobModule,
      ArticleModule,
  ],
  });
  SwaggerModule.setup('api', app, document);

  // ╔╦╗╔═╗╔═╗╦╔╗╔╔═╗  ╔═╗╔╗╔╔╦╗  ╦  ╦╔═╗╔╦╗╔═╗╔╗╔  ╔╦╗╔═╗  ╔═╗╔═╗╦═╗╔╦╗
  // ║║║╣ ╠╣ ║║║║║╣    ╠═╣║║║ ║║  ║  ║╚═╗ ║ ║╣ ║║║   ║ ║ ║  ╠═╝║ ║╠╦╝ ║
  // ═╩╝╚═╝╚  ╩╝╚╝╚═╝  ╩ ╩╝╚╝═╩╝  ╩═╝╩╚═╝ ╩ ╚═╝╝╚╝   ╩ ╚═╝  ╩  ╚═╝╩╚═ ╩
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  warn(`APP IS LISTENING TO PORT ${PORT}`);
}
bootstrap();
