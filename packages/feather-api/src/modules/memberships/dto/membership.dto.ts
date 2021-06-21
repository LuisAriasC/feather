/* Nestjs Dependencies */
import { Directive, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

/* External Dependencies */
import { FilterableField, FilterableRelation, KeySet, PagingStrategies, QueryOptions, Reference } from '@nestjs-query/query-graphql';

/* External Module Dependencies */
import { ClientDTO } from 'src/modules/clients/dto/client.dto';

@ObjectType('Membership')
@FilterableRelation('client', () => ClientDTO, {
  nullable: true,
})
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
@KeySet(['id'])
export class MembershipDTO {
  @FilterableField(() => ID)
  id!: string;

  @FilterableField(() => String)
  email!: string;

  @FilterableField(() => String)
  userName!: string;

  @FilterableField(() => String)
  phoneNumber!: string;

  @FilterableField(() => String, { nullable: true })
  magicToken?: string;

  @FilterableField(() => String, { nullable: true })
  clientId?: string;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  lastLogin?: Date;

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
