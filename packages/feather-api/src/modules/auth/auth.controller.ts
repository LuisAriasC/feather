import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Public } from 'src/modules/authorization';
import { SignupInputDTO } from './dto/input/signup-input.dto';
import { AuthService } from './auth.service';
import { LoginInputDTO } from './dto/input/login-input.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(200)
  public async signup(
    @Body() body: SignupInputDTO,
  ) {
    return await this.authService.signUp(body)
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  public async login(
    @Body() body: LoginInputDTO,
  ) {
    return await this.authService.login(body)
  }

  @Public()
  @Get('authorize')
  @HttpCode(200)
  public async authorize(
    @Query() query,
    @Res() response: Response, 
  ) {
    try{
      const tokens = await this.authService.authorize(query.token);
      return response.cookie('fid', tokens.refreshToken, {
        httpOnly: true,
        path: "/auth/refresh-token"
      }).send({
        accessToken: tokens.accessToken
      });
    } catch (err) {
      throw err
    }
  }

  @Public()
  @Get('logout')
  @HttpCode(200)
  public async logout(
    @Res() response: Response, 
  ) {
    try{
      return response.cookie('fid', null, { expires: new Date()}).send();
    } catch (err) {
      throw err
    }
  }
}
