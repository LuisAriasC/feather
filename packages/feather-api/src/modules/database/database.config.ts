import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as flagsmith from 'flagsmith-nodejs';

export interface DatabaseConfig {
  postgresql: Partial<TypeOrmModuleOptions>;
}

export default registerAs(
  'database',
  async (): Promise<Partial<DatabaseConfig>> => {
    try {

      await flagsmith.init({
        environmentID: process.env.VAULT_ENV
      });

      let vaultUrl= '';

      //Obtain value from vault
      await flagsmith.getValue("dburl")
        .then((value) => {
          vaultUrl = String(value);
        });

      const synchronize = process.env.NODE_ENV === 'development' ? true : false;

      const postgresql: Partial<TypeOrmModuleOptions> = {
        type: 'postgres' as any,
        url: process.env.POSTGRESQL_URL || vaultUrl,
        ssl: {
          rejectUnauthorized: false
        },
        synchronize,
        migrationsRun: true,
        logging: true,
      };

      return {
        postgresql,
      };
    } catch (error) {
      throw error;
    }
  },
);
