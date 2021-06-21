import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import configuration from 'src/modules/database/database.config';

@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(configuration)],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<TypeOrmModuleOptions>('database.postgresql'),
        keepConnectionAlive: true,
        autoLoadEntities: true
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
