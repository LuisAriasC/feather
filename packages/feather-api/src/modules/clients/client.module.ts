/* Nestjs Dependencies */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/* External Dependencies */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
/* External Module Dependencies */
import { MembershipModule } from 'src/modules/memberships/membership.module';
/* Local Module Dependencies */
import { ClientDTO } from 'src/modules/clients/dto/client.dto';
import { ClientInputDTO } from 'src/modules/clients/dto/client-input.dto';
import { ClientUpdateDTO } from 'src/modules/clients/dto/client-update.dto';
import { ClientEntity } from 'src/modules/clients/entity/client.entity';
import { ClientResolver } from 'src/modules/clients/client.resolver';
import { ClientService } from 'src/modules/clients/client.service';

@Module({
  providers: [ClientResolver, ClientService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([ClientEntity]),
        MembershipModule
      ],
      services: [ClientService],
      resolvers: [
        {
          DTOClass: ClientDTO,
          EntityClass: ClientEntity,
          CreateDTOClass: ClientInputDTO,
          UpdateDTOClass: ClientUpdateDTO,
          enableAggregate: true,
          enableTotalCount: true,
          enableSubscriptions: false,
          decorators: [],
          create: { disabled: true },
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          aggregate: { disabled: true }
        },
      ],
    }),
  ],
  exports: [ClientService],
})
export class ClientModule {}
//delete: { disabled: true },
//Si se quieren aplicar filtros a metodos crud en zona de resolver,
//tambien agregarlos en options de CRUDResolver
