/* Nestjs Dependencies */
import { Field, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsNumber,
  IsJSON,
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
/* External Module Dependencies */ 
import { RecommendationDTO } from 'src/modules/recommendations/dto/recommendation.dto';
import GraphQLJSON from 'graphql-type-json';

@InputType('RecommendationUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<RecommendationDTO>, context: GqlContext) => {
    input.update.updatedBy = getUserId(context);
    return input;
  },
)
@BeforeUpdateMany(
  (
    input: UpdateManyInputType<RecommendationDTO, RecommendationDTO>,
    context: GqlContext,
  ) => {
    input.update.updatedBy = getUserId(context);
    return input;
  },
)
export class RecommendationUpdateDTO {

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  membershipId?: string;

  @Field(() => GraphQLJSON)
  @IsOptional()
  @IsJSON()
  @IsNotEmpty()
  questionnarie!: JSON;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  insurances?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deletedBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
