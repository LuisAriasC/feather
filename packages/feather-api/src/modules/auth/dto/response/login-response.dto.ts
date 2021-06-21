/* Nestjs Dependencies */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LoginResponse')
export class LoginResponseDTO {
    @Field(() => String)
    magicToken!: string;
}
