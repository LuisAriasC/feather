/* Nestjs Dependencies */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
/* External Dependencies */
import {
  CRUDResolver,
} from '@nestjs-query/query-graphql';
/* External Module Dependencies */

/* Local Module Dependencies */
import { RecommendationDTO } from 'src/modules/recommendations/dto/recommendation.dto';
import { RecommendationService } from 'src/modules/recommendations/recommendation.service';
import { ReccomendationResponseDTO } from './dto/recommendation-response.dto';
import { Authorize, CheckPermissions, CurrentUser, IUserPayload, Public } from 'src/modules/authorization';
import { CreateHandler } from 'src/common/authorization-policies/create.handler';
import { Subject } from 'src/common/authorization-policies/subject.enum';
import { QuestionnarieInputDTO } from './dto/questionnarie.dto';

@Authorize()
@Resolver(() => RecommendationDTO)
export class RecommendationResolver extends CRUDResolver(RecommendationDTO, {
  create: { disabled: true },
  read: { disabled: true },
  update: { disabled: true },
  aggregate: { disabled: true },
  delete: { disabled: true },
}) {
  constructor(readonly service: RecommendationService) {
    super(service);
  }

  @CheckPermissions(new CreateHandler(Subject.QUESTIONARIE))
  @Mutation(() => ReccomendationResponseDTO)
  public async getRecommendations(
    @Args('input') input: QuestionnarieInputDTO,
    @CurrentUser() user: IUserPayload // User info
  ): Promise<ReccomendationResponseDTO> {
    return await this.service.getRecommendations(input, user);
  }
}
