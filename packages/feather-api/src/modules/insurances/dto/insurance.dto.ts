/* Nestjs Dependencies */
import { ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
/* External Dependencies */
import {
  FilterableField,
  KeySet,
  QueryOptions,
  PagingStrategies,
} from '@nestjs-query/query-graphql';

@ObjectType('Insurance')
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
export class InsuranceDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField()
  type!: string;

  @FilterableField()
  public!: boolean;

  @FilterableField()
  cost!: number;

  @FilterableField()
  frequency!: string;

  @FilterableField()
  description!: string;

  @FilterableField()
  createdBy!: string;

  @FilterableField()
  updatedBy!: string;

  @FilterableField({ nullable: true })
  deletedBy?: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
