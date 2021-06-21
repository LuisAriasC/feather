/* External Dependencies */
import {
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class TypeormCatalogEntity {
  @PrimaryColumn({
    name: 'key',
    type: 'text',
  })
  key!: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description!: string;

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
    nullable: true,
    name: 'deleted_at',
    type: 'timestamp with time zone',
  })
  deletedAt?: Date;
}
