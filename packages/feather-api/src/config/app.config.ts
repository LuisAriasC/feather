/* Nest Dependencies */
import { registerAs } from '@nestjs/config';
import * as flagsmith from 'flagsmith-nodejs';

export default registerAs('config', async () => {
  try {

    await flagsmith.init({
      environmentID: process.env.VAULT_ENV
    });

    let mailerKey = '';
    let mailerSender = '';

    //Obtain value from vault
    await flagsmith.getValue("mailerkey")
      .then((value) => {
        mailerKey = String(value);
      });

          //Obtain value from vault
    await flagsmith.getValue("mailersender")
    .then((value) => {
      mailerSender = String(value);
    });

    const authorization = {
      saltLen: process.env.AUTHORIZATION_SALT_LENGHT || 24,
      authExpiration: process.env.JWT_EXPIRATION || 900,
      refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || 1209600,
      magicExpiration: process.env.JWT_MAGIC_EXPIRATION || 3600,
    };

    const magicURL = process.env.MAGIC_URL || 'http:/localhost:8080'
    const mail = {
      sender: process.env.MAILER_SENDER || mailerSender,
      key: process.env.MAILER_KEY || mailerKey
    }
    
    return {
      environment: process.env.NODE_ENV,
      port: parseInt(process.env.PORT) || 8080,
      authorization,
      magicURL,
      mail
    };
  } catch (err) {
    console.log(err);
  }
});
