/* Nestjs Dependencies */
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
/* External Dependencies */
import * as helmet from 'helmet';
import * as compression from 'compression';
import { Logger } from 'nestjs-pino';
import { useContainer } from 'class-validator';
import * as bodyParser from 'body-parser';
/* Local Module Dependencies */
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('config.port', 3000);
  app.enableCors({ origin: true, credentials: true });
  app.use(bodyParser.json({limit: '1mb'}));
  app.use(compression());
  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );

        const errorMessagesParsed = errorMessages
          .map((error) => error.charAt(0).toUpperCase() + error.slice(1))
          .join(', ');

        return new BadRequestException(String(errorMessagesParsed));
      },
      forbidUnknownValues: false,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(app.get(Logger));

  await app.listen(port);

  console.log(
    `http server listening at ${port} port | ${configService.get<string>(
      'config.environment',
    )}`,
    'main.ts',
    true,
  );
}
bootstrap();
