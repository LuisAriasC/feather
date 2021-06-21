/* External Dependencies */
import { Field, ObjectType } from '@nestjs/graphql';
  
@ObjectType('RefreshToken')
export class RefreshTokenDTO {
  
    @Field(() => String!)
    token!: string;
}
  