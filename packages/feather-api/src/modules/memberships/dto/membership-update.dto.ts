/* Nestjs Dependencies */
import { Field, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  IsOptional,
  IsBoolean,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@nestjs-query/query-graphql';
import {
  GqlContext,
  getUserId
} from 'src/modules/authorization';
/* Local Module Dependencies */
import { MembershipDTO } from 'src/modules/memberships/dto/membership.dto';

@InputType('MembershipUpdate')
@BeforeUpdateOne((input: UpdateOneInputType<MembershipDTO>, context: GqlContext) => {
  input.update.updatedBy = getUserId(context);
  return input;
})
@BeforeUpdateMany(
  (input: UpdateManyInputType<MembershipDTO, MembershipDTO>, context: GqlContext) => {
    input.update.updatedBy = getUserId(context);
    return input;
  },
)
export class MembershipUpdateDTO {

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  magicToken?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  clientId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()  
  lastLogin?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  active?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deletedBy?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
