import { ConnectionOptions } from 'typeorm';

const getPostgresData = async (): Promise<{
    port: number,
    username: string,
    password: string,
    database: string,
    host: string,
    extra: {
        socketPath: string
    }
}> => {
    return {
        port: Number(process.env.POSTGRESQL_PORT),
        username: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD,
        database: process.env.POSTGRESQL_DATABASE,
        host : process.env.POSTGRES_SOCKET,
        extra: {
          socketPath: process.env.POSTGRES_SOCKET,
        },
    }
}

const config: ConnectionOptions = {
    type: 'postgres' as any,
    port: Number(process.env.POSTGRESQL_PORT),
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    host : process.env.POSTGRES_SOCKET,
    extra: {
      socketPath: process.env.POSTGRES_SOCKET,
    },
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: './migrations',
    },
}

export = config;
