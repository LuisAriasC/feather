import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IUserPayload } from 'src/modules/authorization';
import { Strategy } from 'passport-custom';
import { UserPermissions } from 'src/common/data/user-permissions';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super(async (req: any, done: (error: any, user?: any) => void) => {
      try {
        const user = await this.authService.verifyAccessToken(req.token);
        if (!user) {
          return done(null, null);
        }
        // G¿Here we can get permissions from api
        const permissions = UserPermissions;
        const payloadUser: IUserPayload = {
          userId: user.userId,
          permissions
        }
        return done(null, payloadUser);
      } catch (error) {
        return done(error, null);
      }
    });
  }
}
