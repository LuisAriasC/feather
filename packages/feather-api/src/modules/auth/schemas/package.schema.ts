/* Nestjs Dependencies */
import { ObjectType, ID, GraphQLISODateTime, Field } from '@nestjs/graphql';

@ObjectType('Package')
export class PackageDTO {
  @Field()
  id: string;

  @Field({ nullable: true })
  comment?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  trackingNumber: string;

  @Field()
  referenceId: string;

  @Field()
  price: number;

  @Field()
  similarity: number;

  @Field({ nullable: true })
  deliveryId?: string;

  @Field()
  clientId?: string;

  @Field()
  sizeKey: string;

  @Field()
  width?: number;

  @Field()
  height?: number;

  @Field()
  weight?: number;

  @Field()
  length?: number;

  @Field()
  volumetricWeight?: number;

  @Field()
  packageStatusKey: string;

  @Field()
  createdBy: string;

  @Field()
  updatedBy: string;

  @Field({ nullable: true })
  deletedBy?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}
