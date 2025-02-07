import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    MinLength
} from "class-validator";

export class CreateAdminDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('UZ')
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;

    confirm_password: string;
}
