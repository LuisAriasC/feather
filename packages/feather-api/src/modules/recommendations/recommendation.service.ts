/* Nestjs Dependencies */
import { InjectRepository } from '@nestjs/typeorm';
/* External Dependencies */
import {
  QueryService,
} from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
/* External Module */

/* Local Module Dependencies */
import { RecommendationEntity } from 'src/modules/recommendations/entity/recommendation.entity';
import { ReccomendationResponseDTO } from './dto/recommendation-response.dto';
import { QuestionnarieInputDTO } from './dto/questionnarie.dto';
import { InsuranceDTO } from '../insurances/dto/insurance.dto';
import { InsuranceService } from '../insurances/insurance.service';
import { RecommendationDTO } from './dto/recommendation.dto';
import { nanoid } from 'nanoid';
import { IUserPayload } from 'src/modules/authorization';
import { CustomError } from 'src/common/utils/error';
import { ErrorCode } from 'src/common/catalogs/error.catalog';
import { InsuranceEntity } from '../insurances/entity/insurance.entity';

@QueryService(RecommendationEntity)
export class RecommendationService extends TypeOrmQueryService<RecommendationEntity> {
  constructor(
    @InjectRepository(RecommendationEntity)
    repo: Repository<RecommendationEntity>,
    private connection: Connection,
    private insuranceService: InsuranceService
  ) {
    super(repo, { useSoftDelete: true });
  }

  public async createRecommendation(
    input: RecommendationDTO,
    queryRunner: QueryRunner
  ): Promise<RecommendationEntity> {
    const result = await queryRunner
      .manager
      .save(
        RecommendationEntity,
        input
      )
    return result
  }

  public obtainInsurancesByOccupation(
    occupation: string,
    allInsurances: Array<InsuranceEntity>
  ): Array<InsuranceDTO> {
    let insurances: Array<InsuranceDTO> = [];
    switch(occupation){
      case 'Student':
        insurances= [
          ...insurances,
          ...allInsurances.filter(insurance => (insurance.type === "STUD" || (insurance.type === 'HLTH' && insurance.public === true)))
        ]
        break;
      case 'Employed':
      case 'Self employed':
        insurances= [
          ...insurances,
          ...allInsurances.filter(insurance => (insurance.type === "JOB" || insurance.type === 'HLTH' || insurance.type === 'LEGA'))
        ]
        break;
      case 'Unemployed':
        insurances= [
          ...insurances,
          ...allInsurances.filter(insurance => (insurance.type === 'HLTH' && insurance.public === true))
        ]
        break;
      default:
        break;
    }
    return insurances;
  }

  public async getRecommendations(
    input: QuestionnarieInputDTO,
    user: IUserPayload
  ): Promise<ReccomendationResponseDTO> {

    let insurances: Array<InsuranceDTO> = [];
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const allInsurances = await this.insuranceService.query({ filter: { deletedAt: { is: null } }, paging: { limit: 100000 }});

      // Get general insurances
      insurances = [...allInsurances.filter(insurance => (insurance.type === 'LIAB' || insurance.type === 'CAR' || insurance.type === 'DENT'))]

      // Get insurances by house
      if(input.address){
        insurances = [...insurances,...allInsurances.filter(insurance => (insurance.type === 'HOUS'))]
      }

      // Get insurances by occupation
      insurances = [...insurances, ...this.obtainInsurancesByOccupation(input.occupation, allInsurances)]

      // Get insurances if perso has children
      if(input.children) {
        insurances = [
          ...insurances,
          ...allInsurances.filter(insurance => (insurance.type === 'LIFE'))
        ]
      }

      let insuranceString = '';
      for(let i = 0; i < insurances.length; i++) {
        if(i === 0) {
          insuranceString = insurances[i].id;  
        } else {
          insuranceString = insuranceString + `,${insurances[i].id}`
        }
      }
      const recommendationInput: RecommendationDTO = {
        id: nanoid(24),
        membershipId: user.userId,
        questionnarie: JSON.parse(JSON.stringify(input)),
        insurances: insuranceString,
        createdBy: user.userId,
        updatedBy: user.userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const createdRecommendation = await this.createRecommendation(
        recommendationInput,
        queryRunner
      )
      await queryRunner.commitTransaction();
      // Sent in request for testings
      return {
        insurances
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      // Error on signup request
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    } finally {
      await queryRunner.release();
    }
  }

}
