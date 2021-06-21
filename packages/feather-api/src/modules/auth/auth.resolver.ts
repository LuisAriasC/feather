import { Resolver, Args, Mutation, Query, Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'src/modules/auth/auth.service';
import { Public } from 'src/modules/authorization';
import { SignupInputDTO } from './dto/input/signup-input.dto';
import { SignupResponseDTO } from './dto/response/signup-response.dto';
import { LoginResponseDTO } from './dto/response/login-response.dto';
import { LoginInputDTO } from './dto/input/login-input.dto';
import { AuthorizeResponseDTO } from './dto/response/authorize-response.dto';
import express from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignupResponseDTO)
  public async signup(
    @Args('data') data: SignupInputDTO,
  ): Promise<SignupResponseDTO> {
    return await this.authService.signUp(data);
  }

  @Public()
  @Query(() => LoginResponseDTO)
  public async login(
    @Args('data') data: LoginInputDTO,
  ): Promise<LoginResponseDTO> {
    return await this.authService.login(data);
  }

  @Public()
  @Query(() => AuthorizeResponseDTO)
  public async authorize(
    @Args('token') token: string,
    @Context("req") req: express.Request
  ): Promise<AuthorizeResponseDTO> {
    const tokens = await this.authService.authorize(token);
    req.res?.cookie('fid', tokens.refreshToken, {
      httpOnly: true,
      path: "/auth/refresh-token"
    });
    return {
      accessToken: tokens.accessToken
    }
  }

  @Public()
  @Query(() => Boolean)
  public async logout(
    @Args('logout') logout: boolean,
    @Context("req") req: express.Request
  ): Promise<Boolean> {
    req.res?.cookie('fid', null, { expires: new Date()});
    return true;
  }
}
