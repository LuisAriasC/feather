/* Nestjs Dependencies */
import { Field } from '@nestjs/graphql';
/* External Dependencies */
import { IsString, IsNotEmpty } from 'class-validator';

export class TypeormCatalogInputDTO {
  @Field()
  @IsString()
  @IsNotEmpty()
  key!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description!: string;
}
