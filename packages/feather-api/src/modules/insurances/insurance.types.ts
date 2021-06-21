/* Nestjs Dependencies */
import { ArgsType, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  DeleteManyInputType,
  MutationArgsType,
} from '@nestjs-query/query-graphql';
/* Local Module Dependencies */
import { InsuranceDTO } from 'src/modules/insurances/dto/insurance.dto';

@InputType()
class DeleteManyInsurancesInput extends DeleteManyInputType(InsuranceDTO) {}

@ArgsType()
export class DeleteManyInsurancesArgs extends MutationArgsType(
  DeleteManyInsurancesInput,
) {}
