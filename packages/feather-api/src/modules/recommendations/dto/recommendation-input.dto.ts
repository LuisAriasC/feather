/* Nestjs Dependencies */
import { Field, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@nestjs-query/query-graphql';
import {
  IsString,
  IsNotEmpty,
  IsJSON,
} from 'class-validator';
import { nanoid } from 'nanoid';
import {
  GqlContext,
  getUserId,
} from 'src/modules/authorization'; 
/* Local Module Dependencies */
/* External Module Dependencies */ 
import { RecommendationDTO } from 'src/modules/recommendations/dto/recommendation.dto';
import GraphQLJSON from 'graphql-type-json';

@InputType('RecommendationInput')
@BeforeCreateOne(
  (input: CreateOneInputType<RecommendationDTO>, context: GqlContext) => {
    input.input.id = nanoid(24);
    input.input.createdBy = getUserId(context);
    input.input.updatedBy = getUserId(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<RecommendationDTO>, context: GqlContext) => {
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
export class RecommendationInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  membershipId!: string;

  @Field(() => GraphQLJSON)
  @IsJSON()
  @IsNotEmpty()
  questionnarie!: JSON;

  @Field()
  @IsString()
  @IsNotEmpty()
  insurances!: string;
}
