/* Nestjs Dependencies */
import { ArgsType, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  DeleteManyInputType,
  MutationArgsType,
} from '@nestjs-query/query-graphql';
/* Local Module Dependencies */
import { MembershipDTO } from 'src/modules/memberships/dto/membership.dto';

@InputType()
class DeleteManyMembershipsInput extends DeleteManyInputType(MembershipDTO) {}

@ArgsType()
export class DeleteManyMembershipsArgs extends MutationArgsType(
  DeleteManyMembershipsInput,
) {}
