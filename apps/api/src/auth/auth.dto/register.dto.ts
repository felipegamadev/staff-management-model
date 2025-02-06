import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from 'class-validator'
import { IsEmailUnique, IsPasswordMatching } from 'common/validators'

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    @IsEmailUnique()
    email: string

    @IsStrongPassword()
    password: string

    @IsPasswordMatching('password')
    passwordConfirmation: string
}
