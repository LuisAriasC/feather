/* Nestjs dependencies */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/* External dependencies */
import { PinoLogger } from 'nestjs-pino';
/* Local module dependencies */
import { NotificationService } from 'src/modules/notifications/notification.service';
import { MailerModule } from '../mailer/mailer.module';
import { UrlModule } from '../urls/url.module';

@Module({
  providers: [
    NotificationService,
    {
      provide: PinoLogger,
      useValue: new PinoLogger({}),
    },
  ],
  imports: [
    UrlModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get<string>('config.mail.key')
      }),
    })
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
