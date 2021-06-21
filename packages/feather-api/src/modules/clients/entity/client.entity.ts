/* External Dependencies */
import { Column, Entity, JoinColumn, ManyToOne, ObjectType, OneToMany } from 'typeorm';
/* External Module Dependencies */
import { TypeormEntity } from 'src/common/typeorm/entity/typeorm.entity';
import { MembershipEntity } from 'src/modules/memberships/entity/membership.entity';

@Entity({ name: 'client' })
export class ClientEntity extends TypeormEntity {
  @Column({
    name: 'first_name',
    type: 'text',
  })
  firstName!: string;

  @Column({
    name: 'last_name',
    type: 'text',
  })
  lastName!: string;

  @Column({
    name: 'date_of_birth',
    type: 'timestamp with time zone',
    nullable: true,
  })
  dateOfBirth?: Date;

  @Column({
    name: 'active',
    type: 'boolean',
    default: true,
  })
  active?: boolean;

  @OneToMany(
    (): ObjectType<MembershipEntity> => MembershipEntity, (me) => me.client,
    {
      onDelete: 'NO ACTION',
      nullable: true,
    },
  )
  memberships?: MembershipEntity[];
}
