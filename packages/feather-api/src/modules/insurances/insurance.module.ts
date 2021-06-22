/* Nestjs Dependencies */
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/* External Dependencies */
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { CheckPermissions } from 'src/modules/authorization';
/* External Module Dependencies */
import { CreateHandler } from 'src/common/authorization-policies/create.handler';
import { ReadHandler } from 'src/common/authorization-policies/read.handler';
import { UpdateHandler } from 'src/common/authorization-policies/update.handler';
import { Subject } from 'src/common/authorization-policies/subject.enum';
/* Local Module Dependencies */
import { InsuranceDTO } from 'src/modules/insurances/dto/insurance.dto';
import { InsuranceInputDTO } from 'src/modules/insurances/dto/insurance-input.dto';
import { InsuranceUpdateDTO } from 'src/modules/insurances/dto/insurance-update.dto';
import { InsuranceEntity } from 'src/modules/insurances/entity/insurance.entity';
import { InsuranceResolver } from 'src/modules/insurances/insurance.resolver';
import { InsuranceService } from 'src/modules/insurances/insurance.service';

@Module({
  providers: [InsuranceResolver, InsuranceService],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([InsuranceEntity])],
      services: [InsuranceService],
      resolvers: [
        {
          DTOClass: InsuranceDTO,
          EntityClass: InsuranceEntity,
          CreateDTOClass: InsuranceInputDTO,
          UpdateDTOClass: InsuranceUpdateDTO,
          enableAggregate: true,
          enableTotalCount: true,
          enableSubscriptions: false,
          create: {
            decorators: [CheckPermissions(new CreateHandler(Subject.INSURANCE))],
          },
          //read: {
          //  decorators: [CheckPermissions(new ReadHandler(Subject.INSURANCE))],
          //},
          //update: {
          //  decorators: [CheckPermissions(new UpdateHandler(Subject.STOCK))],
          //},
          //aggregate: {
          //  decorators: [CheckPermissions(new ReadHandler(Subject.STOCK))],
          //},
          delete: { disabled: true },
        },
      ],
    }),
  ],
  exports: [InsuranceService],
})
export class InsuranceModule {}
//delete: { disabled: true },
//Si se quieren aplicar filtros a metodos crud en zona de resolver,
//tambien agregarlos en options de CRUDResolver
