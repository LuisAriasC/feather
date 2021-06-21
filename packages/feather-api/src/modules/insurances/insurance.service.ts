/* Nestjs Dependencies */
import { InjectRepository } from '@nestjs/typeorm';
/* External Dependencies */
import {
  DeleteManyResponse,
  Filter,
  QueryService,
  UpdateManyResponse,
} from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';
import { IUserPayload } from 'src/modules/authorization';
/* External Module */
import { ResponseStatusEnum } from 'src/common/catalogs/response-status.enum';
import { DeleteOneResponseDTO } from 'src/common/dto/delete-one-response.dto';
import { CustomError, CustomErrorCode } from 'src/common/utils/error';
import { ErrorCode } from 'src/common/catalogs/error.catalog';
/* Local Module Dependencies */
import { InsuranceEntity } from 'src/modules/insurances/entity/insurance.entity';

@QueryService(InsuranceEntity)
export class InsuranceService extends TypeOrmQueryService<InsuranceEntity> {
  constructor(@InjectRepository(InsuranceEntity) repo: Repository<InsuranceEntity>) {
    super(repo, { useSoftDelete: true });
  }

  async deleteOneInsurance(
    id: string | number,
    user: IUserPayload,
  ): Promise<DeleteOneResponseDTO> {
    try {
      const st = await this.updateOne(id, {
        deletedAt: new Date(),
        deletedBy: user.userId,
      });
      if (!st) {
        throw new CustomError(CustomErrorCode.INEXISTENT_ENTITY_IN_DB);
      }
      return {
        status: ResponseStatusEnum.OK,
      };
    } catch (error) {
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    }
  }

  async deleteManyInsurances(
    filter: Filter<InsuranceEntity>,
    user: IUserPayload,
  ): Promise<DeleteManyResponse> {
    try {
      const update: UpdateManyResponse = await this.updateMany(
        { deletedAt: new Date(), deletedBy: user.userId },
        filter,
      );
      return {
        deletedCount: update.updatedCount,
      };
    } catch (error) {
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    }
  }

  async restoreOneInsurance(
    id: string | number,
    user: IUserPayload,
  ): Promise<InsuranceEntity> {
    try {
      return await this.updateOne(id, {
        updatedBy: user.userId,
        updatedAt: new Date(),
        deletedAt: new Date(),
      });
    } catch (error) {
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    }
  }

  async restoreManyInsurances(
    filter: Filter<InsuranceEntity>,
    user: IUserPayload,
  ): Promise<UpdateManyResponse> {
    try {
      return await this.updateMany(
        {
          updatedBy: user.userId,
          updatedAt: new Date(),
          deletedAt: new Date(),
        },
        filter,
      );
    } catch (error) {
      throw new CustomError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
        details: error,
      });
    }
  }
}
