/* Nestjs Dependencies */
import { InjectRepository } from '@nestjs/typeorm';
/* External Dependencies */
import {
  QueryService,
} from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';

/* Local Module Dependencies */
import { MembershipEntity } from 'src/modules/memberships/entity/membership.entity';
import { MembershipDTO } from './dto/membership.dto';
import { MagicTokenDTO } from '../tokens/dto/magic-token.dto';

@QueryService(MembershipEntity)
export class MembershipService extends TypeOrmQueryService<MembershipEntity> {
  constructor(
    @InjectRepository(MembershipEntity) repo: Repository<MembershipEntity>,
  ) {
    super(repo, { useSoftDelete: true });
  }

  // Create membership as a transaction
  public async createMembership(
    input: MembershipDTO,
    queryRunner: QueryRunner
  ): Promise<MembershipEntity> {
    return await queryRunner.manager.save(MembershipEntity, input);
  }

  // Save membership as a transaction
  public async saveMembership(
    membership: MembershipEntity,
    queryRunner: QueryRunner
  ): Promise<MembershipEntity> {
    return await queryRunner.manager.save(membership);
  }
}
