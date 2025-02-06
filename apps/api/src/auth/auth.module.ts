import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '@/user/user.module'
import {
    IsEmailUniqueConstraint,
    IsPasswordMatchingConstraint
} from 'common/validators'

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        IsEmailUniqueConstraint,
        IsPasswordMatchingConstraint
    ]
})
export class AuthModule {}
