/* Nestjs Dependencies */
import { Field } from '@nestjs/graphql';
/* External Dependencies */
import { IsOptional, IsString, IsDate, IsNotEmpty } from 'class-validator';

export class TypeormCatalogUpdateDTO {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  key?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deletedBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
