import { Injectable } from '@nestjs/common'
import {
    registerDecorator,
    ValidatorConstraint,
    type ValidatorConstraintInterface,
    type ValidationArguments,
    type ValidationOptions
} from 'class-validator'

@Injectable()
@ValidatorConstraint({ async: false })
export class IsPasswordMatchingConstraint
    implements ValidatorConstraintInterface
{
    public async validate(
        confirmPassword: string,
        args: ValidationArguments
    ): Promise<boolean> {
        const [relatedPropertyName] = args.constraints
        const password = (args.object as any)[relatedPropertyName]
        return confirmPassword === password
    }

    public defaultMessage(args: ValidationArguments): string {
        const [relatedPropertyName] = args.constraints
        return `${relatedPropertyName} and ${args.property} do not match.`
    }
}

export function IsPasswordMatching(
    property: string,
    validationOptions?: ValidationOptions
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsPasswordMatchingConstraint
        })
    }
}
