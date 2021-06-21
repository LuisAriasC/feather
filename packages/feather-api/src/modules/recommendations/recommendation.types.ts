/* Nestjs Dependencies */
import { ArgsType, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  DeleteManyInputType,
  MutationArgsType,
} from '@nestjs-query/query-graphql';
/* Local Module Dependencies */
import { RecommendationDTO } from 'src/modules/recommendations/dto/recommendation.dto';

@InputType()
class DeleteManyRecommendationsInput extends DeleteManyInputType(RecommendationDTO) {}

@ArgsType()
export class DeleteManyRecommendationsArgs extends MutationArgsType(
  DeleteManyRecommendationsInput,
) {}
