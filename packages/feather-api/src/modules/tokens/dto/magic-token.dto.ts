/* External Dependencies */
import { Field, ObjectType } from '@nestjs/graphql';
  
@ObjectType('MagicToken')
export class MagicTokenDTO {
  
    @Field(() => String!)
    token!: string;
  
    @Field(() => String!)
    code!: string;
  
    @Field(() => Date!)
    issuedAd!: Date;
  
    @Field(() => Date!)
    expiresInDate!: Date;
  
    @Field(() => Number!)
    expiresInSeconds!: number;
}
  