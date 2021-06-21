/* External Dependencies */
import { TypeormEntity } from 'src/common/typeorm/entity/typeorm.entity';
import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'recommendation' })
export class RecommendationEntity extends TypeormEntity{
  @PrimaryColumn({
    name: 'id',
    type: 'text',
  })
  id!: string;

  @Column({
    name: 'membership_id',
    type: 'text',
  })
  membershipId!: string;

  @Column({
    name: 'insurances',
    type: 'text',
  })
  insurances!: string;

  @Column({
    name: 'questionnarie',
    type: 'jsonb',
  })
  questionnarie!: JSON;
}
