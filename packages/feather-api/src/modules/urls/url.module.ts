/* Nestjs dependencies */
import { Module } from '@nestjs/common';
/* External dependencies */
import { PinoLogger } from 'nestjs-pino';
/* Local module dependencies */
import { UrlService } from 'src/modules/urls/url.service';

@Module({
  providers: [
    UrlService,
    {
      provide: PinoLogger,
      useValue: new PinoLogger({}),
    },
  ],
  exports: [UrlService],
})
export class UrlModule {}
