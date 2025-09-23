import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT ?? 3000;

const buildDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Micro Core Banking')
    .setDescription('Micro Core Banking API')
    .setVersion('0.1')
    .addTag('Accounts')
    .addTag('Transactions')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, documentFactory);
};

const bootstrap = async () => {
  const app: INestApplication = await NestFactory.create(AppModule);
  buildDocument(app);
  await app.listen(PORT);
};

bootstrap().catch((error) =>
  console.error('Error during app bootstrap:', error),
);
