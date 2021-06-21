/* Nestjs Dependencies */
import { InjectRepository } from '@nestjs/typeorm';
/* External Dependencies */
import {
  QueryService,
} from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryRunner, Repository } from 'typeorm';
/* External Module */
import { MembershipService } from 'src/modules/memberships/membership.service';
/* Local Module Dependencies */
import { ClientEntity } from 'src/modules/clients/entity/client.entity';
import { ClientDTO } from './dto/client.dto';

@QueryService(ClientEntity)
export class ClientService extends TypeOrmQueryService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity) repo: Repository<ClientEntity>,
    readonly membershipService: MembershipService,
  ) {
    super(repo, { useSoftDelete: true });
  }

  public async createClient(
    input: ClientDTO,
    queryRunner: QueryRunner
  ): Promise<ClientEntity> {
    const result = await queryRunner
      .manager
      .save(
        ClientEntity,
        input
      )
  return result
  }
}
