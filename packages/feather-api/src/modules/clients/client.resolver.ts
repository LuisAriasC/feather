/* Nestjs Dependencies */
import { Resolver } from '@nestjs/graphql';
/* External Dependencies */
import {
  CRUDResolver,
} from '@nestjs-query/query-graphql';
/* Local Module Dependencies */
import { ClientDTO } from 'src/modules/clients/dto/client.dto';
import { ClientService } from 'src/modules/clients/client.service';

@Resolver(() => ClientDTO)
export class ClientResolver extends CRUDResolver(ClientDTO, {
  create: { disabled: true },
  read: { disabled: true },
  update: { disabled: true },
  delete: { disabled: true },
  aggregate: { disabled: true }
}) {
  constructor(readonly service: ClientService) {
    super(service);
  }
}
