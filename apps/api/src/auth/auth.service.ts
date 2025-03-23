import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { TokenService } from '@/token/token.service'
import { CookieService } from '@/cookie/cookie.service'
import { type LoginDto, type RegisterDto } from './auth.dto'
import { type User } from '@prisma/client'
import { type Request, type Response } from 'express'
import Constants from '@/utils/constants'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly cookieService: CookieService
    ) {}

    public async profile(request: Request): Promise<User | null> {
        const user = (request.user as User) ?? null
        return user
    }

    public async login(loginDto: LoginDto, response: Response): Promise<void> {
        const { email, password } = loginDto
        const user = await this.userService.findByEmail(email)
        if (user == null || !(await argon2.verify(user.password, password))) {
            throw new UnauthorizedException()
        }
        await this.tokenService.deleteMany(user)
        const token = await this.tokenService.create(user)
        this.cookieService.create(Constants.AUTH_TOKEN, token.token, response)
    }

    public async register(registerDto: RegisterDto): Promise<void> {
        const { name, email, password } = registerDto
        await this.userService.create(name, email, password)
    }

    public async logout(request: Request, response: Response): Promise<void> {
        const user = (request.user as User) ?? null
        await this.tokenService.deleteMany(user)
        this.cookieService.delete(Constants.AUTH_TOKEN, response)
    }
}
