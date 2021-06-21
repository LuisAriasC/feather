/* Nestjs Dependencies */
import { Module } from '@nestjs/common';
/* External Dependencies */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AuthorizationModule, CheckPermissions } from 'src/modules/authorization';
/* External Module Dependencies */
import { CreateHandler } from 'src/common/authorization-policies/create.handler';
import { ReadHandler } from 'src/common/authorization-policies/read.handler';
import { UpdateHandler } from 'src/common/authorization-policies/update.handler';
import { Subject } from 'src/common/authorization-policies/subject.enum';
/* Local Module Dependencies */
import { RecommendationDTO } from 'src/modules/recommendations/dto/recommendation.dto';
import { RecommendationInputDTO } from 'src/modules/recommendations/dto/recommendation-input.dto';
import { RecommendationUpdateDTO } from 'src/modules/recommendations/dto/recommendation-update.dto';
import { RecommendationEntity } from 'src/modules/recommendations/entity/recommendation.entity';
import { RecommendationResolver } from 'src/modules/recommendations/recommendation.resolver';
import { RecommendationService } from 'src/modules/recommendations/recommendation.service';
import { InsuranceModule } from '../insurances/insurance.module';

@Module({
  providers: [RecommendationResolver, RecommendationService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([RecommendationEntity]),
        InsuranceModule,
        AuthorizationModule
      ],
      services: [RecommendationService],
      resolvers: [
        {
          DTOClass: RecommendationDTO,
          EntityClass: RecommendationEntity,
          CreateDTOClass: RecommendationInputDTO,
          UpdateDTOClass: RecommendationUpdateDTO,
          enableAggregate: true,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: { disabled: true },
          read: { disabled: true },
          update: { disabled: true },
          aggregate: { disabled: true },
          delete: { disabled: true },
        },
      ],
    }),
  ],
  exports: [RecommendationService],
})
export class RecommendationModule {}
//delete: { disabled: true },
//Si se quieren aplicar filtros a metodos crud en zona de resolver,
//tambien agregarlos en options de CRUDResolver
