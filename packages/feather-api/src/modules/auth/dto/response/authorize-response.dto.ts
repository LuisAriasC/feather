/* Nestjs Dependencies */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AuthorizeResponse')
export class AuthorizeResponseDTO {
    @Field(() => String)
    accessToken!: string;
}
