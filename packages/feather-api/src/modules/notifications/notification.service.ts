/* Nestjs dependencies */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/* External dependencies */
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Mail } from '../mailer/interfaces/mail.interface';
import { MailerService } from '../mailer/mailer.service';
import { UrlService } from '../urls/url.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectPinoLogger(NotificationService.name)
    private readonly logger: PinoLogger,
    private urlService: UrlService,
    private mailService: MailerService
  ) {}


  public async sendMail(
    mail: Mail
  ): Promise<boolean> {
    return await this.mailService.send(mail);
  }

  // Could be better with a notification template
  public async buildSignupMail(
    name: string,
    token: string,
    from: string,
    to: string,
  ): Promise<Mail>{

    const magicURL = await this.urlService.buildAuthUrl('authorize', token)
    const subject = 'Welcome to Feather'
    const message = `Hi ${name}!\n\n` + 
      `We are glad to get you on board and trust us as your insurance partner.` +
      ` Here you will find a link to log into your account without a password. Dont worry, it is completely safe.\n\n` + 
      `${magicURL}\n\n` +
      `Cheers,\n` + 
      `Feather`

    return {
      from,
      to,
      subject,
      text: message
    }
  }

    // Could be better with a notification template
    public async buildLoginMail(
      name: string,
      token: string,
      from: string,
      to: string,
    ): Promise<Mail>{
  
      const magicURL = await this.urlService.buildAuthUrl('auth/authorize', token)
      const subject = 'Your login link, Feather'
      const message = `Hi ${name}!\n\n` + 
        `Just click on the next link to log into your account.` +
        ` We are glad you are back.\n\n` + 
        `${magicURL}\n\n` +
        `Cheers,\n` + 
        `Feather`
  
      return {
        from,
        to,
        subject,
        text: message
      }
    }
}
