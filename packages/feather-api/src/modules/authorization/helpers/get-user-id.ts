import { GqlContext } from '../interfaces/gql-context.interface';

export const getUserId = (context: GqlContext): string => context.req.user.userId;
