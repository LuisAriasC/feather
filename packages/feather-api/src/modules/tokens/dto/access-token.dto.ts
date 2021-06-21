/* External Dependencies */
import { Field, ObjectType } from '@nestjs/graphql';
  
@ObjectType('AccessToken')
export class AccessTokenDTO {
  
    @Field(() => String!)
    token!: string;
}
  