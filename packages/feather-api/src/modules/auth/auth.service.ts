/* Nestjs dependencies */
import { Injectable } from '@nestjs/common';
/* External dependencies */
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CustomError, CustomErrorCode } from 'src/common/utils/error';
import { ErrorCode } from 'src/common/catalogs/error.catalog';
/* Local module dependencies */
import { SignupInputDTO } from './dto/input/signup-input.dto';
import { SignupResponseDTO } from './dto/response/signup-response.dto';
import { Connection } from 'typeorm';
import { ClientService } from '../clients/client.service';
import { MembershipService } from '../memberships/membership.service';
import { ResponseStatusEnum } from 'src/common/catalogs/response-status.enum';
import { ClientDTO } from '../clients/dto/client.dto';
import { nanoid } from 'nanoid';
import { MembershipDTO } from '../memberships/dto/membership.dto';
import { TokensService } from '../tokens/tokens.service';
import { NotificationService } from '../notifications/notification.service';
import { ConfigService } from '@nestjs/config';
import { LoginInputDTO } from './dto/input/login-input.dto';
import { LoginResponseDTO } from './dto/response/login-response.dto';
import { TokenPayload } from '../tokens/interfaces/token-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    private connection: Connection,
    private clientService: ClientService,
    private membershipService: MembershipService,
    private tokensService: TokensService,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {}

  private getClientFromInput(
    input: SignupInputDTO
  ): ClientDTO {
    // Create id with nanoid
    const clientId = nanoid(24);
    return {
      id: clientId,
      firstName: input.firstName,
      lastName: input.lastName,
      dateOfBirth: input.dateOfBirth,
      createdBy: clientId,
      updatedBy: clientId,
    }
  }

  private getMembershipFromInput(
    input: SignupInputDTO,
    clientId: string,
  ): MembershipDTO {
    return {
      id: nanoid(24),
      email: input.email,
      userName: input.userName,
      phoneNumber: input.phoneNumber,
      clientId: clientId,
      createdBy: clientId,
      updatedBy: clientId 
    }
  }

  public async signUp(
    input: SignupInputDTO
  ): Promise<SignupResponseDTO> {
    
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // Create client profile
      const client = await this.clientService.createClient(
        this.getClientFromInput(input),
        queryRunner
      );

      // Generate magic token
      const token = await this.tokensService.generateMagicToken();
      // Create client membership
      const membershipInput = this.getMembershipFromInput(input, client.id);
      membershipInput.magicToken = token.code;
      const membership = await this.membershipService.createMembership(
        membershipInput,
        queryRunner
      );

      // Generate signup mail
      const mail = await this.notificationService.buildSignupMail(
        client.firstName,
        token.token,
        this.configService.get<string>('config.mail.sender'),
        membership.email
      );

      // Send magic url to users email
      await this.notificationService.sendMail(mail);
      await queryRunner.commitTransaction();
      // Sent in request for testings
      return {
        magicToken: token.token
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // Error on signup request
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    } finally {
      await queryRunner.release();
    }
  }

  public async login(
    input: LoginInputDTO
  ): Promise<LoginResponseDTO> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      // Find users membership
      const [membership] = await this.membershipService.query({
        filter: {
          or: [
            { email: { eq: input.userName } },
            { userName: { eq: input.userName } }
          ],
          deletedAt: { is: null }
        },
        paging: { limit: 1 }
      });

      if(!membership) {
        throw new CustomError(CustomErrorCode.INVALID_USER)
      }

      // Generate magic token
      const token = await this.tokensService.generateMagicToken();

      membership.magicToken = token.code;

      // Update membership with magic token
      const updatedMembership = await this.membershipService.saveMembership(membership, queryRunner);

      // Get username for mail
      const client = await this.clientService.findById(membership.clientId);

      // Generate signup mail
      const mail = await this.notificationService.buildLoginMail(
        client.firstName,
        token.token,
        this.configService.get<string>('config.mail.sender'),
        membership.email
      );

      // Send magic url to users email
      await this.notificationService.sendMail(mail);
      await queryRunner.commitTransaction();
      // Sent in request to make testings
      return {
        magicToken: token.token
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // Something went wrong at login
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    } finally {
      await queryRunner.release();
    }
  }

  public async authorize(
    token: string
  ): Promise<{
    accessToken: string,
    refreshToken: string
  }> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verify token
      const membership = await this.tokensService.verifyMagicToken(token);

      // Remove magic token from membership to avoid hacks
      membership.magicToken = null;
      const updatedMembership = await this.membershipService.saveMembership(membership, queryRunner);

      // Generate access token
      const accessToken = await this.tokensService.generateAccessToken(updatedMembership);

      // Generate refresh token
      const refreshToken = await this.tokensService.generateRefreshToken(updatedMembership);
      
      await queryRunner.commitTransaction();
      return {
        accessToken: accessToken.token,
        refreshToken: refreshToken.token
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // Authorize error
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    } finally {
      await queryRunner.release();
    }
  }

  public async verifyAccessToken(
    token: string 
  ): Promise<TokenPayload> {
    return await this.tokensService.verifyAccessToken(token) 
  }
}
