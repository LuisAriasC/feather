/* Nestjs Dependencies */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('SignupResponse')
export class SignupResponseDTO {
    @Field(() => String)
    magicToken!: string;
}
