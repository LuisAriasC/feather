/* Nestjs Dependencies */
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
/* External Dependencies */
import { FilterableCursorConnection, FilterableField, FilterableRelation, KeySet, PagingStrategies, QueryOptions } from '@nestjs-query/query-graphql';
/* External Module Dependencies */
import { MembershipDTO } from 'src/modules/memberships/dto/membership.dto';

@ObjectType('Client')
@FilterableCursorConnection(
  'memberships',
  () => MembershipDTO,
  {
    nullable: true,
    pagingStrategy: PagingStrategies.OFFSET,
    enableAggregate: true,
    enableTotalCount: true,
    maxResultsSize: 1000,
  },
)
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
@KeySet(['id'])
export class ClientDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField(() => String)
  firstName!: string;

  @FilterableField(() => String)
  lastName!: string;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  dateOfBirth?: Date;

  @FilterableField(() => Boolean)
  active?: boolean;

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
