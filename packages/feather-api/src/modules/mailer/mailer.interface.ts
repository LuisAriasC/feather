/* Nestjs Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface MailerOptions {
  apiKey: string;
}

export interface MailerOptionsFactory {
  createMailerOptions(): Promise<MailerOptions> | MailerOptions;
}

export interface MailerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MailerOptionsFactory>;
  useClass?: Type<MailerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailerOptions> | MailerOptions;
  inject?: any[];
}

export interface CreateMailerOptions {
  inSeconds?: number;
}
