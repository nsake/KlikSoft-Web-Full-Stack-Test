import helmet from 'helmet';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import fastifyCsrf from '@fastify/csrf-protection';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());

  await app.register(fastifyCsrf);

  await app.listen(3000);
}
bootstrap();
