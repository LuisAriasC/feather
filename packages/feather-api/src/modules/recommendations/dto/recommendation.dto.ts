/* Nestjs Dependencies */
import { ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
/* External Dependencies */
import {
  FilterableField,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Recommendation')
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
export class RecommendationDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  membershipId!: string;

  @FilterableField(() => GraphQLJSON)
  questionnarie!: JSON;

  @FilterableField(() => String)
  insurances!: string;

  @FilterableField()
  createdBy!: string;

  @FilterableField()
  updatedBy!: string;

  @FilterableField({ nullable: true })
  deletedBy?: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt?: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt?: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
