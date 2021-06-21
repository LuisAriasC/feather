/* External Dependencies */
import { Field, ObjectType } from '@nestjs/graphql';
import { InsuranceDTO } from 'src/modules/insurances/dto/insurance.dto';
  
@ObjectType('RecommendationResponse')
export class ReccomendationResponseDTO {
    
    @Field(() => [InsuranceDTO!]!)
    insurances!: InsuranceDTO[];
}
  