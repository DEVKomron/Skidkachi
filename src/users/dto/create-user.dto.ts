import { IsNotEmpty, IsPhoneNumber, IsString,IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsPhoneNumber("UZ")
    phone: string;
    
    @IsEmail()
    email: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
    
    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}
