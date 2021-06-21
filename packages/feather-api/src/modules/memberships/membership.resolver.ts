/* Nestjs Dependencies */
import { Resolver } from '@nestjs/graphql';

/* External Dependencies */
import {
  CRUDResolver,
} from '@nestjs-query/query-graphql';

/* Local Module Dependencies */
import { MembershipDTO } from 'src/modules/memberships/dto/membership.dto';
import { MembershipService } from 'src/modules/memberships/membership.service';

@Resolver(() => MembershipDTO)
export class MembershipResolver extends CRUDResolver(MembershipDTO, {
  create: { disabled: true },
  read: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
  aggregate: { disabled: true }
}) {
  constructor(readonly service: MembershipService) {
    super(service);
  }
}
