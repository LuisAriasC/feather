import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './jwt.config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { MembershipModule } from '../memberships/membership.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(configuration)],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<JwtModuleOptions>('jwt')
      }),
      inject: [ConfigService],
    }),
    MembershipModule
  ],
  providers: [TokensService],
  exports: [TokensService]
})
export class TokensModule {}
