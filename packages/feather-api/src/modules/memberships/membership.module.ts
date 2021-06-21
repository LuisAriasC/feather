/* Nestjs Dependencies */
import { Module } from '@nestjs/common';

/* External Dependencies */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/* External Module Dependencies */

/* Local Module Dependencies */
import { MembershipDTO } from 'src/modules/memberships/dto/membership.dto';
import { MembershipInputDTO } from 'src/modules/memberships/dto/membership-input.dto';
import { MembershipUpdateDTO } from 'src/modules/memberships/dto/membership-update.dto';
import { MembershipEntity } from 'src/modules/memberships/entity/membership.entity';
import { MembershipResolver } from 'src/modules/memberships/membership.resolver';
import { MembershipService } from 'src/modules/memberships/membership.service';

@Module({
  providers: [MembershipResolver, MembershipService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([MembershipEntity]),
      ],
      services: [
        MembershipService,
      ],
      resolvers: [
        {
          DTOClass: MembershipDTO,
          EntityClass: MembershipEntity,
          CreateDTOClass: MembershipInputDTO,
          UpdateDTOClass: MembershipUpdateDTO,
          enableAggregate: true,
          enableTotalCount: true,
          enableSubscriptions: false,
          decorators: [],
          create: { disabled: true },
          read: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          aggregate: { disabled: true }
        }
      ],
    }),
  ],
  exports: [MembershipService],
})
export class MembershipModule {}
//delete: { disabled: true },
//Si se quieren aplicar filtros a metodos crud en zona de resolver,
//tambien agregarlos en options de CRUDResolver
