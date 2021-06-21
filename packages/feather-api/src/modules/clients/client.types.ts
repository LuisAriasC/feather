/* Nestjs Dependencies */
import { ArgsType, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  DeleteManyInputType,
  MutationArgsType,
} from '@nestjs-query/query-graphql';
/* Local Module Dependencies */
import { ClientDTO } from 'src/modules/clients/dto/client.dto';

@InputType()
class DeleteManyClientsInput extends DeleteManyInputType(ClientDTO) {}

@ArgsType()
export class DeleteManyClientsArgs extends MutationArgsType(
  DeleteManyClientsInput,
) {}
