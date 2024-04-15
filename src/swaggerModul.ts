import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RewardCategoryModule } from './app-public/reward-category/reward-category.module';

export const Swagger = (app: any) => {
  SwaggerModule.setup(
    'docs/store',
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
        include: [RewardCategoryModule],
      },
    ),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );
};
