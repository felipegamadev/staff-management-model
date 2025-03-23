import {
    type CanActivate,
    type ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from '@/token/token.service'
import { UserService } from '@/user/user.service'
import { type Request } from 'express'
import Constants from '@/utils/constants'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        const token: string = request.cookies[Constants.AUTH_TOKEN]
        if (token == null || !(await this.tokenService.isRegistered(token)))
            throw new UnauthorizedException()

        try {
            const payload: { sub: number } =
                await this.jwtService.verifyAsync(token)
            request.user = (await this.userService.findById(payload.sub)) ?? ''
        } catch {
            throw new UnauthorizedException()
        }
        return true
    }
}
