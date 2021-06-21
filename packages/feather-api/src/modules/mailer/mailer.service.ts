/* Nestjs dependencies */
import { Inject, Injectable } from '@nestjs/common';
/* External dependencies */
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
/* Local module dependencies */
import * as sgMail from '@sendgrid/mail';
import { MAILER_OPTIONS } from './mailer.constants';
import { Mail } from './interfaces/mail.interface';

@Injectable()
export class MailerService {
  constructor(
    @InjectPinoLogger(MailerService.name)
    private readonly logger: PinoLogger,
    @Inject(MAILER_OPTIONS) private options
  ) {
      sgMail.setApiKey(this.options.apiKey)   
  }

    public async send(
        message: Mail
    ): Promise<boolean> {
        let status;
        let err;

        await sgMail
          .send(message)
          .then(() => {
              status = true;
          }).catch((error) => {
            console.log(error)
              status = false;
              err = error
          });
        if(!status){
          throw err
        }
        return status;
    }
}
