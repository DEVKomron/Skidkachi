import { IsNotEmpty, IsPhoneNumber, IsString,IsEmail, MinLength } from "class-validator";

export class SignInUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}
