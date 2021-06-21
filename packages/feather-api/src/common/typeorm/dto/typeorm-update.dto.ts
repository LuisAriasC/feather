/* Nestjs Dependencies */
import { Field } from '@nestjs/graphql';
/* External Dependencies */
import { IsOptional, IsString, IsDate } from 'class-validator';

export class TypeormUpdateDTO {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deletedBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
