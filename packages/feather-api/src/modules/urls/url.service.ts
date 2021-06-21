/* Nestjs dependencies */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/* External dependencies */
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UrlService {
  constructor(
    private readonly configService: ConfigService,
    @InjectPinoLogger(UrlService.name)
    private readonly logger: PinoLogger,
  ) {}

  // Build login URL with token
  public async buildAuthUrl(
    endpoint: string,
    token: string
  ): Promise<string> {
      return `${this.configService.get<string>('config.magicURL')}/${endpoint}?token=${token}`
  }
}
