/* Nestjs Dependencies */
import { ID, GraphQLISODateTime } from '@nestjs/graphql';
/* External Dependencies */
import { FilterableField, KeySet } from '@nestjs-query/query-graphql';

@KeySet(['key'])
export class TypeormCatalogDTO {
  @FilterableField(() => ID)
  key!: string;

  @FilterableField(() => String)
  description!: string;

  @FilterableField(() => String)
  createdBy!: string;

  @FilterableField(() => String)
  updatedBy!: string;

  @FilterableField(() => String, { nullable: true })
  deletedBy?: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt?: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt?: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
