/* Nestjs Dependencies */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
/* External Dependencies */
import {
  DeleteManyResponse,
  Filter,
  UpdateManyResponse,
} from '@nestjs-query/core';
import {
  CRUDResolver,
  DeleteManyResponseType,
  DeleteOneInputType,
  FilterType,
  UpdateManyResponseType,
} from '@nestjs-query/query-graphql';
import {
  IUserPayload,
  CurrentUser,
  CheckPermissions,
} from 'src/modules/authorization';
/* External Module Dependencies */
import { DeleteHandler } from 'src/common/authorization-policies/delete.handler';
import { RestoreHandler } from 'src/common/authorization-policies/restore.handler';
import { Subject } from 'src/common/authorization-policies/subject.enum';
import { DeleteOneResponseDTO } from 'src/common/dto/delete-one-response.dto';
/* Local Module Dependencies */
import { InsuranceDTO } from 'src/modules/insurances/dto/insurance.dto';
import { InsuranceService } from 'src/modules/insurances/insurance.service';
import { DeleteManyInsurancesArgs } from 'src/modules/insurances/insurance.types';

@Resolver(() => InsuranceDTO)
export class InsuranceResolver extends CRUDResolver(InsuranceDTO, {
  delete: { disabled: true },
}) {
  constructor(readonly service: InsuranceService) {
    super(service);
  }

  @CheckPermissions(new DeleteHandler(Subject.INSURANCE))
  @Mutation(() => DeleteOneResponseDTO)
  async deleteOneInsurance(
    @Args('input', { type: () => DeleteOneInputType() })
    input: DeleteOneInputType,
    @CurrentUser() user: IUserPayload,
  ): Promise<DeleteOneResponseDTO> {
    return await this.service.deleteOneInsurance(input.id, user);
  }

  @CheckPermissions(new DeleteHandler(Subject.INSURANCE))
  @Mutation(() => DeleteManyResponseType())
  async deleteManyInsurances(
    @Args() { input }: DeleteManyInsurancesArgs,
    @CurrentUser() user: IUserPayload,
  ): Promise<DeleteManyResponse> {
    return await this.service.deleteManyInsurances(input.filter, user);
  }

  @CheckPermissions(new RestoreHandler(Subject.INSURANCE))
  @Mutation(() => InsuranceDTO)
  restoreOneInsurance(
    @Args('input', { type: () => DeleteOneInputType() })
    input: DeleteOneInputType,
    @CurrentUser() user: IUserPayload,
  ): Promise<InsuranceDTO> {
    return this.service.restoreOneInsurance(input.id, user);
  }

  @CheckPermissions(new RestoreHandler(Subject.INSURANCE))
  @Mutation(() => UpdateManyResponseType())
  restoreManyInsurances(
    @Args('input', { type: () => FilterType(InsuranceDTO) })
    filter: Filter<InsuranceDTO>,
    @CurrentUser() user: IUserPayload,
  ): Promise<UpdateManyResponse> {
    return this.service.restoreManyInsurances(filter, user);
  }
}
