import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(6)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/^[a-zA-Z0-9]*$/)
  password: string;
}