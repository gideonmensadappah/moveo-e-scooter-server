import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import configuration from './common/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configuration().port;

  const cors = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  app.enableCors(cors);
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
