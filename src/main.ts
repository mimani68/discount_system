import { NestFactory                        } from '@nestjs/core';
import { ValidationPipe                     } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder     } from '@nestjs/swagger';
import * as timeout from 'connect-timeout';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  |
  |  Server
  |
  */
  app.enableCors({ origin: '*' })
  app.setGlobalPrefix('/api/v1')
  app.use(timeout(120000));
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: { target: false, value: false },
      dismissDefaultMessages: true,
    }),
  );

  /*
  |
  |  Swagger
  |
  */
  const options = new DocumentBuilder()
    .addBearerAuth()
    .addServer('/api/v1', 'version 1')
    .setContact('Mahdi Imani', 'https://github.com/mimani68/discount_system', 'imani.mahdi@gmail.com')
    .setTitle('Zarin Backend')
    .setDescription('This is backend of stories microservices')
    .setVersion('1.0')
    .addTag('authenticate')
    .addTag('shop')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
