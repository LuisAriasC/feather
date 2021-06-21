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
} from 'class-validator';
import {
  GqlContext,
  getUserId
} from 'src/modules/authorization';
/* Local Module Dependencies */
import { ClientDTO } from 'src/modules/clients/dto/client.dto';
import { nanoid } from 'nanoid';

@InputType('ClientInput')
@BeforeCreateOne((input: CreateOneInputType<ClientDTO>, context: GqlContext) => {
  input.input.id = nanoid(24)
  const user = getUserId(context) !== '' ? getUserId(context) : 'SYSTEM';
  input.input.createdBy = user;
  input.input.updatedBy = user;
  return input;
})
@BeforeCreateMany(
  (input: CreateManyInputType<ClientDTO>, context: GqlContext) => {
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
export class ClientInputDTO {

  @Field()
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;
}
