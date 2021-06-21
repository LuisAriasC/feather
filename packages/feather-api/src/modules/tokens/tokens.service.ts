import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { MagicTokenDTO } from './dto/magic-token.dto';
import { MembershipService } from '../memberships/membership.service';
import { MembershipEntity } from '../memberships/entity/membership.entity';
import { AccessTokenDTO } from './dto/access-token.dto';
import { MembershipDTO } from '../memberships/dto/membership.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class TokensService {
  constructor(
    private readonly configService: ConfigService,
    @InjectPinoLogger(TokensService.name) private readonly logger: PinoLogger,
    private jwtService: JwtService,
    private membershipService: MembershipService,
  ) {}

  private async generateRandomCode(): Promise<string> {
    const salt = nanoid(
      this.configService.get<number>('config.authorization.saltLen'),
    );
    return salt;
  }

  private async encodeMagicToken(
    code: string
  ): Promise<string> {
    return this.jwtService.sign({ 
      code 
    }
    ,{ expiresIn: `${this.configService.get<number>('config.authorization.magicExpiration')}s`});
  }

  public async generateMagicToken(): Promise<MagicTokenDTO> {

    this.logger.debug(`Generate new magic token`);

    const date: Date = new Date();
    const expirationTime: number = this.configService.get<number>(
      'config.authorization.magicExpiration',
    );
    const code = await this.generateRandomCode();

    // Convert code object to base 64 to generate a token
    const magicToken = await this.encodeMagicToken(code);

    this.logger.debug(`Generatd magic token: ${magicToken}`);

    return {
      token: magicToken,
      code: code,
      issuedAd: date,
      expiresInDate: new Date(date.getTime() + (expirationTime * 1000)),
      expiresInSeconds: expirationTime
    };
  }

  public async verifyMagicToken(
    magicToken: string
  ): Promise<MembershipEntity> {

    this.logger.debug(`Verify magic token`);

    try {
      const payload = this.jwtService.verify(magicToken);

      const [membership] = await this.membershipService.query({
        filter: {
          magicToken: { eq: payload.code }
        },
        paging: { limit: 1 }
      });
      
      if(!membership) {
        throw new Error('Invalid token');
      }

      // Second expiration verification
      const tokenExpiration = new Date(payload.exp * 1000);
      const expirationTime = new Date()
      if(tokenExpiration.getTime() < expirationTime.getTime()) {
        throw new Error('Token expired');
      }
      
      return membership;
    } catch (error) {
      throw error;
    }
  }

  private async encodeAccessToken(
    payload: TokenPayload
  ): Promise<string> {
    return this.jwtService.sign(
      payload
    ,{ expiresIn: `${this.configService.get<number>('config.authorization.authExpiration')}s`});
  }

  public async generateAccessToken(
    membership: MembershipDTO
  ): Promise<AccessTokenDTO> {

    this.logger.debug(`Generate new access token`);

    const code = nanoid(24);
    const token = await this.encodeAccessToken({
      userId: membership.id,
      userName: membership.userName,
      userEmail: membership.email
    });

    this.logger.debug(`Generatd access token: ${token}`);

    return {
      token
    };
  }

  public async verifyAccessToken(
    token: string
  ): Promise<TokenPayload> {

    this.logger.debug(`Verify access token`);

    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw error;
    }
  }

  private async encodeRefreshToken(
    payload: TokenPayload
  ): Promise<string> {
    return this.jwtService.sign(
      payload
    ,{ expiresIn: `${this.configService.get<number>('config.authorization.refreshExpiration')}s`});
  }

  public async generateRefreshToken(
    membership: MembershipDTO
  ): Promise<RefreshTokenDTO> {

    this.logger.debug(`Generate new refresh token`);

    const code = nanoid(24);
    const token = await this.encodeRefreshToken({
      userId: membership.id,
      userName: membership.userName,
      userEmail: membership.email
    });

    this.logger.debug(`Generatd refresh token: ${token}`);

    return {
      token
    };
  }

  public async verifyRefreshToken(
    token: string
  ): Promise<TokenPayload> {
    this.logger.debug(`Verify refresh token`);

    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw error;
    }
  }
}
