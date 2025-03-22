import { Injectable } from '@nestjs/common'
import {
    registerDecorator,
    type ValidationOptions,
    ValidatorConstraint,
    type ValidatorConstraintInterface,
    type ValidationArguments
} from 'class-validator'
import { UserService } from '@/user/user.service'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    public async validate(
        email: string,
        args: ValidationArguments
    ): Promise<boolean> {
        const user = await this.userService.findByEmail(email)
        return user == null
    }

    public defaultMessage(validationArguments: ValidationArguments): string {
        return 'email has already been taken'
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint
        })
    }
}
