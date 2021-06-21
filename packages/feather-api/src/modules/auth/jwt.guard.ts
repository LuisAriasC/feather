import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from 'src/modules/authorization';
import { CustomError, CustomErrorCode } from 'src/common/utils/error';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    try {
      let req = context.switchToHttp().getRequest();
      if (!req) {
        req = GqlExecutionContext.create(context).getContext().req
      }
      let token: string | null;
      if (req.headers?.authorization?.startsWith('Bearer ')) {
        token = req.headers?.authorization.substring(
          7,
          req.headers.authorization.length,
        );
      } else {
        token = String(req.headers?.authorization);
      }
      if (req.headers?.token) {
        token = String(req.headers?.token);
      }
      if (!token) {
        throw new CustomError(CustomErrorCode.INVALID_AUTH_TOKEN);
      }
      req.token = token;
      return req;
    } catch (error) {
      throw error;
    }
  }

  handleRequest(error, user, info: Error) {
    if (error) {
      throw new CustomError({
        code: CustomErrorCode.INTERNAL_SERVER_ERROR.code,
        message: error.message,
      });
    }
    if (info || !user) {
      throw new CustomError(CustomErrorCode.UNAUTHORIZED);
    }
    return user;
  }
}
