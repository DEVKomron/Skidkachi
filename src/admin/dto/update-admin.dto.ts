import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateAdminDto{
    @IsString()
    @IsOptional()
    name?: string;

    @IsPhoneNumber("UZ")
    @IsOptional()
    phone?: string;

    @IsEmail()
    @IsOptional()
    email?: string
}
