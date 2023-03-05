import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Habits Tracker')
    .setDescription('Habits Tracker API')
    .setVersion('0.1')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options = {
    explorer: false,
    customCss: theme.getBuffer('dark'),
  };

  SwaggerModule.setup('/api/swagger', app, document, options);

  app.enableCors({
    origin: ['https://habits-tracker.ru'],
    credentials: true,
  });

  app.use(cookieParser());

  const port = process.env.PORT || 3001;

  await app.listen(port);

  console.log(`Server is running on port ${port}`);
}

bootstrap();
