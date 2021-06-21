import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@InputType('LoginInput')
export class LoginInputDTO {

  @Field()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short'
  })
  @MaxLength(50, {
    message: 'Username is too long'
  })
  @IsNotEmpty()
  userName!: string;
}
