import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppPublicModule } from './app-public/module';
import { AppCommonModule } from './app-common/module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IncomingMessage, Server, ServerResponse } from 'http';

export const Swagger = (
  app: NestExpressApplication<
    Server<typeof IncomingMessage, typeof ServerResponse>
  >,
) => {
  SwaggerModule.setup(
    'docs/public',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
      {
        include: [...AppPublicModule],
      },
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  SwaggerModule.setup(
    'docs/common',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
      {
        include: [...AppCommonModule],
      },
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );
};
