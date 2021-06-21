import { IUserPayload } from './user-payload.interface';

export interface GqlContext {
  req: {
    user: IUserPayload;
  }
}
