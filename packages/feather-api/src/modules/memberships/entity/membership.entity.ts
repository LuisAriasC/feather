/* External Dependencies */
import { Column, Entity, JoinColumn, ManyToOne, ObjectType } from 'typeorm';
/* External Module Dependencies */
import { TypeormEntity } from 'src/common/typeorm/entity/typeorm.entity';
import { ClientEntity } from 'src/modules/clients/entity/client.entity';

@Entity({ name: 'membership' })
export class MembershipEntity extends TypeormEntity {
  @Column({
    name: 'email',
    type: 'text',
    unique: true
  })
  email!: string;

  @Column({
    name: 'user_name',
    type: 'text',
    unique: true
  })
  userName!: string;

  @Column({
    name: 'phone_number',
    type: 'text',
  })
  phoneNumber: string;

  @Column({
    name: 'magic_token',
    type: 'text',
    nullable: true
  })
  magicToken?: string;

  @Column({
    name: 'client_id',
    type: 'text',
    nullable: true
  })
  clientId?: string;

  @Column({
    name: 'last_login',
    type: 'timestamp with time zone',
    nullable: true
  })
  lastLogin?: Date;

  @Column({
    name: 'active',
    type: 'boolean',
    default: true,
  })
  active?: boolean;

  @ManyToOne(
    (): ObjectType<ClientEntity> => ClientEntity,
    (cl) => cl.memberships,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'client_id' })
  client?: ClientEntity;
}
