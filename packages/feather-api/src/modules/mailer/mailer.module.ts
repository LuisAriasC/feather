/* Nestjs Dependencies */
import { DynamicModule, Module, Provider, HttpModule } from '@nestjs/common';
/* Local Module Dependencies */
import {
  MailerAsyncOptions,
  MailerOptions,
  MailerOptionsFactory,
} from 'src/modules/mailer/mailer.interface';
import { MAILER_OPTIONS } from 'src/modules/mailer/mailer.constants';
import { MailerService } from 'src/modules/mailer/mailer.service';

@Module({})
export class MailerModule {
  /**
   * forRoot
   *
   * @param options
   */
  public static forRoot(options: MailerOptions): DynamicModule {
    return {
      module: MailerModule,
      imports: [HttpModule],
      providers: [
        MailerService,
        {
          provide: MAILER_OPTIONS,
          useValue: options,
        },
      ],
      exports: [MailerService, MAILER_OPTIONS],
    };
  }

  /**
   * forRootAsync
   *
   * @param options
   */
  public static forRootAsync(options: MailerAsyncOptions): DynamicModule {
    return {
      module: MailerModule,
      imports: [HttpModule],
      providers: [
        MailerService,
        ...this.createAsyncProviders(options),
      ],
      exports: [MailerService, MAILER_OPTIONS],
    };
  }

  private static createAsyncProviders(options: MailerAsyncOptions): Provider[] {
    const providers: Provider[] = [this.createAsyncOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: MailerAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        name: MAILER_OPTIONS,
        provide: MAILER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      name: MAILER_OPTIONS,
      provide: MAILER_OPTIONS,
      useFactory: async (optionsFactory: MailerOptionsFactory) =>
        await optionsFactory.createMailerOptions(),
      inject: [options.useExisting! || options.useClass!],
    };
  }
}
