import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import * as flagsmith from 'flagsmith-nodejs';


export default registerAs(
  'jwt',
  async (): Promise<Partial<JwtModuleOptions>> => {
    try {

      await flagsmith.init({
        environmentID: process.env.VAULT_ENV
      });
      let jwtPublic = '';
      let jwtPrivate = '';

      //Obtain value from vault
      await flagsmith.getValue("jwtprivate")
      .then((value) => {
        jwtPrivate = String(value);
      });

      //Obtain jwt public key from vault
      await flagsmith.getValue("jwtpublic")
      .then((value) => {
        jwtPublic = String(value);
      });

      return {
        signOptions: {
          algorithm: 'RS256',
          expiresIn: Number(process.env.JWT_EXPIRATION) || '15m',
          issuer: process.env.JWT_ISSUER || 'https://feather.com',
        },
        privateKey: process.env.JWT_PRIVATE ? process.env.JWT_PRIVATE.replace(/\\n/gm, '\n') : jwtPrivate.replace(/\\n/gm, '\n'),
        publicKey: process.env.JWT_PUBLIC ? process.env.JWT_PUBLIC.replace(/\\n/gm, '\n') : jwtPublic.replace(/\\n/gm, '\n')
      };
    } catch (error) {
      throw error;
    }
  },
);
