/* Nestjs Dependencies */
import { Field, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
} from 'class-validator';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import {
  GqlContext,
  getUserId,
} from 'src/modules/authorization'; 
/* Local Module Dependencies */
/* External Module Dependencies */ import { InsuranceDTO } from 'src/modules/insurances/dto/insurance.dto';

@InputType('InsuranceUpdate')
@BeforeUpdateOne((input: UpdateOneInputType<InsuranceDTO>, context: GqlContext) => {
  // eslint-disable-next-line no-param-reassign
  input.update.updatedBy = getUserId(context);
  return input;
})
@BeforeUpdateMany(
  (input: UpdateManyInputType<InsuranceDTO, InsuranceDTO>, context: GqlContext) => {
    input.update.updatedBy = getUserId(context);
    return input;
  },
)
export class InsuranceUpdateDTO {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name!: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  type!: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  public?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cost!: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  frequency!: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  active?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  deletedBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  deletedAt?: Date;
}
