/* Nestjs Dependencies */
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
/* External Dependencies */
import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsDate,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import {
  GqlContext,
  getUserId
} from 'src/modules/authorization';

/* Local Module Dependencies */
import { MembershipDTO } from 'src/modules/memberships/dto/membership.dto';
import { nanoid } from 'nanoid';

@InputType('MembershipInput')
@BeforeCreateOne((input: CreateOneInputType<MembershipDTO>, context: GqlContext) => {
  input.input.id = nanoid(24)
  const user = getUserId(context) !== '' ? getUserId(context) : 'SYSTEM';
  input.input.createdBy = user;
  input.input.updatedBy = user;
  return input;
})
@BeforeCreateMany(
  (input: CreateManyInputType<MembershipDTO>, context: GqlContext) => {
    const user = getUserId(context) !== '' ? getUserId(context) : 'SYSTEM';
    const createdBy = user;
    const updatedBy = user;
    input.input = input.input.map((c) => {
      return {
        ...c,
        id: nanoid(24),
        createdBy,
        updatedBy,
      };
    });
    return input;
  },
)
export class MembershipInputDTO {

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  userName!: string;

  @Field()
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  clientId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()  
  lastLogin?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;
}
