/* Nestjs dependencies */
import { Module } from '@nestjs/common';
/* External dependencies */
import { PinoLogger } from 'nestjs-pino';
/* Local module dependencies */
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthResolver } from 'src/modules/auth/auth.resolver';
import { ClientModule } from '../clients/client.module';
import { MembershipModule } from '../memberships/membership.module';
import { TokensModule } from '../tokens/tokens.module';
import { NotificationModule } from '../notifications/notification.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    {
      provide: PinoLogger,
      useValue: new PinoLogger({}),
    },
  ],
  imports: [
    ClientModule,
    MembershipModule,
    TokensModule,
    NotificationModule
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
