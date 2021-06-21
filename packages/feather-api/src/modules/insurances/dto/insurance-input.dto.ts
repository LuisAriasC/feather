/* Nestjs Dependencies */
import { Field, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { nanoid } from 'nanoid';
import {
  GqlContext,
  getUserId,
} from 'src/modules/authorization'; /* Local Module Dependencies */
/* External Module Dependencies */ import { InsuranceDTO } from 'src/modules/insurances/dto/insurance.dto';

@InputType('InsuranceInput')
@BeforeCreateOne((input: CreateOneInputType<InsuranceDTO>, context: GqlContext) => {
  input.input.id = nanoid(24);
  input.input.createdBy = getUserId(context);
  input.input.updatedBy = getUserId(context);
  return input;
})
@BeforeCreateMany(
  (input: CreateManyInputType<InsuranceDTO>, context: GqlContext) => {
    const createdBy = getUserId(context);
    const updatedBy = getUserId(context);
    input.input = input.input.map((c) => {
      const id = nanoid(24);
      return {
        ...c,
        id,
        createdBy,
        updatedBy,
      };
    });
    return input;
  },
)
export class InsuranceInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  type!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  public?: boolean;

  @Field()
  @IsString()
  @IsNotEmpty()
  cost!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  frequency!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;
}
