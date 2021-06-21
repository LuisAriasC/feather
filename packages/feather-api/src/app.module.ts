/* Nestjs Dependencies */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
/* External dependencies */
import { LoggerModule } from 'nestjs-pino';
/* Modules dependencies */
import { DatabaseModule } from 'src/modules/database/database.module';
/* Local dependencies */
import appConfig from 'src/config/app.config';
import appSchema from 'src/config/app.schema';
import { GraphQLError } from 'graphql';
import { ErrorInfo } from 'src/common/utils/error';
import { ErrorCode } from './common/catalogs/error.catalog';
import { ClientModule } from './modules/clients/client.module';
import { MembershipModule } from './modules/memberships/membership.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorizationGuard, AuthorizationModule } from 'src/modules/authorization';
import { InsuranceModule } from './modules/insurances/insurance.module';
import { JwtGuard } from './modules/auth/jwt.guard';
import { RecommendationModule } from './modules/recommendations/recommendation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      validationSchema: appSchema,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: { level: configService.get<string>('LOG_LEVEL', 'info') },
        };
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      subscriptions: false,
      playground: true,
      cors: {
        credentials: true,
        origin: true
      },
      context: async ({ req, request }) => {//: Promise<GqlContext> => {
        //console.log(req)
        //if (req?.headers[USER_HEADER]) {
        //  return { user: JSON.parse(req.headers[USER_HEADER]) };
        //}
        //if (request?.headers[USER_HEADER]) {
        //  return { user: JSON.parse(request.headers[USER_HEADER]) };
        //}
        //return;
      },
      formatError: (error: GraphQLError): ErrorInfo => {
        if (error.extensions?.exception?.errorInfo) {
          return {
            message:
              error.extensions.exception.errorInfo.message || error.message,
            code: error.extensions.exception.errorInfo.code,
            details: error.extensions.exception.errorInfo.details,
          };
        } else {
          if (error.extensions?.exception) {
            return {
              code: error.extensions.code || ErrorCode.INTERNAL_SERVER_ERROR,
              message: error.message,
              details: error.extensions.exception.detail,
            };
          }
          return {
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: error.message,
          };
        }
      },
    }),
    DatabaseModule,
    AuthModule,
    ClientModule,
    MembershipModule,
    InsuranceModule,
    RecommendationModule,
    AuthorizationModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
  exports: [ConfigModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
