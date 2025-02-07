import { Injectable } from '@nestjs/common'
import { TokenService } from '@/token/token.service'
import { UserService } from '@/user/user.service'
import { type RegisterDto } from './auth.dto'
import { type Token } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    public async register(registerDto: RegisterDto): Promise<Token> {
        const { name, email, password } = registerDto
        const user = await this.userService.create(name, email, password)
        return await this.tokenService.create(user)
    }
}
