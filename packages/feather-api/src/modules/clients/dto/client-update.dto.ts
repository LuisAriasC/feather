/* Nestjs Dependencies */
import { Field, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  IsOptional,
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
/* External Module Dependencies */
import {
  GqlContext,
  getUserId
} from 'src/modules/authorization';
/* Local Module Dependencies */
import { ClientDTO } from 'src/modules/clients/dto/client.dto';

@InputType('ClientUpdate')
@BeforeUpdateOne((input: UpdateOneInputType<ClientDTO>, context: GqlContext) => {
  input.update.updatedBy = getUserId(context);
  return input;
})
@BeforeUpdateMany(
  (input: UpdateManyInputType<ClientDTO, ClientDTO>, context: GqlContext) => {
    input.update.updatedBy = getUserId(context);
    return input;
  },
)
export class ClientUpdateDTO {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  active?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deletedBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
