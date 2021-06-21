import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

@InputType('SignupInput')
export class SignupInputDTO {

  @Field()
  @IsString()
  @MinLength(2, {
    message: 'First name is too short'
  })
  @MaxLength(46, {
    message: 'First name is too long'
  })
  @IsNotEmpty()
  firstName!: string;

  @Field()
  @IsString()
  @MinLength(2, {
    message: 'First name is too short'
  })
  @MaxLength(46, {
    message: 'First name is too long'
  })
  @IsNotEmpty()
  lastName!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @Field()
  @IsEmail()
  @MinLength(3, {
    message: 'Email is too short'
  })
  @MaxLength(50, {
    message: 'Email is too long'
  })
  @IsNotEmpty()
  email!: string;

  @Field()
  @IsString()
  @MinLength(5, {
    message: 'Username is too short'
  })
  @MaxLength(25, {
    message: 'Username is too long'
  })
  @IsNotEmpty()
  userName!: string;

  @Field()
  @IsPhoneNumber()
  @MinLength(10, {
    message: 'Phone number is too short'
  })
  @MaxLength(15, {
    message: 'Phone number is too long'
  })
  @IsNotEmpty()
  phoneNumber!: string;
}
