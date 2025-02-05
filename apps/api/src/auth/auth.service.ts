import { Injectable } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { type RegisterDto } from './auth.dto'
import { type User } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    public async register(registerDto: RegisterDto): Promise<User> {
        const { name, email } = registerDto
        return await this.userService.create(name, email)
    }
}
