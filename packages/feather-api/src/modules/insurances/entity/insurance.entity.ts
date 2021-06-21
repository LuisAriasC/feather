/* External Dependencies */
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'insurance' })
export class InsuranceEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'text',
  })
  id!: string;

  @Column({
    name: 'name',
    type: 'text',
  })
  name!: string;

  @Column({
    name: 'type',
    type: 'text',
  })
  type!: string;

  @Column({
    name: 'public',
    type: 'boolean',
    default: false
  })
  public!: boolean;

  @Column({
    name: 'cost',
    type: 'float',
  })
  cost!: number;

  @Column({
    name: 'frequency',
    type: 'text',
    enum: ['Day', 'Week', 'Month', 'Year', 'OneTime']
  })
  frequency!: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description!: string;

  @Column({
    name: 'active',
    type: 'boolean',
    default: true,
  })
  active!: boolean;

  @Column({
    name: 'created_by',
    type: 'text',
  })
  createdBy!: string;

  @Column({
    name: 'updated_by',
    type: 'text',
  })
  updatedBy!: string;

  @Column({
    nullable: true,
    name: 'deleted_by',
    type: 'text',
  })
  deletedBy?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
  })
  deletedAt?: Date;
}
