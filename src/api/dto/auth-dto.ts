import {
  IsEmail,
} from "class-validator";

export class CheckEmailDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;
}
