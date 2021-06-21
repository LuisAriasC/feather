/* Nestjs Dependencies */
import { Field, InputType } from '@nestjs/graphql';
/* External Dependencies */
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
  IsPostalCode,
  ValidateNested,
  IsIn,
  Min,
  ValidateIf,
  IsEmail,
} from 'class-validator';
/* Local Module Dependencies */
/* External Module Dependencies */ 

@InputType('QustionnarieAddressInput')
export class QuestionnarieAddressInputDTO {
  @Field()
  @IsString()
  @MinLength(5, {
    message: 'Street name is too short'
  })
  @MaxLength(50, {
    message: "Street name is too long"
  })
  @IsNotEmpty()
  street!: string;

  @Field()
  @IsString()
  @MaxLength(6, {
    message: "External number is too long"
  })
  @IsNotEmpty()
  externalNumber!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(6, {
    message: "Internal number is too long"
  })
  internalNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Neighborhood is too short'
  })
  @MaxLength(40, {
    message: "Neighborhood is too long"
  })
  neighborhood?: string;

  @Field()
  @IsPostalCode('DE')
  @MinLength(5, {
    message: 'Zipcode is too short'
  })
  @MaxLength(5, {
    message: "Zipcode is too long"
  })
  @IsNotEmpty()
  zipCode!: string;

  @Field()
  @IsString()
  @MinLength(5, {
    message: 'State is too short'
  })
  @MaxLength(40, {
    message: "State is too long"
  })
  @IsNotEmpty()
  state!: string;

  @Field()
  @IsString()
  @MinLength(5, {
    message: 'Country is too short'
  })
  @MaxLength(5, {
    message: "Country is too long"
  })
  @IsNotEmpty()
  country!: string;
}

@InputType('QuestionnarieInput')
export class QuestionnarieInputDTO {
  @Field()
  @IsString()
  @MinLength(3, {
    message: 'Name is too short'
  })
  @MaxLength(50, {
    message: "Name is too long"
  })
  @IsNotEmpty()
  firstName!: string;

  @Field(() => QuestionnarieAddressInputDTO, { nullable: true })
  @IsOptional()
  address?: QuestionnarieAddressInputDTO;

  @Field(() => String)
  @IsIn(['Student', 'Employed', 'Self employed', 'Unemployed'])
  @IsNotEmpty()
  occupation!: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  children!: boolean;

  @Field(() => Number, { nullable: true })
  @ValidateIf(q => q.children === true)
  @IsOptional()
  @Min(0)
  @IsNotEmpty({
    message: 'Put the number of children if you have'
  })
  childrenCount?: number;

  @Field()
  @IsEmail()
  @MinLength(5, {
    message: 'Email is too short'
  })
  @MaxLength(50, {
    message: "Email is too long"
  })
  @IsNotEmpty()
  email!: string;
}
