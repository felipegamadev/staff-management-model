import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/prisma/prisma.service'
import { Cron, CronExpression } from '@nestjs/schedule'
import { type Token, type User } from '@prisma/client'
import { type Request } from 'express'
import * as ms from 'ms'
import { type StringValue } from 'ms'

@Injectable()
export class TokenService extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request.cookies.jwt ?? null
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') ?? ''
        })
    }

    public async validate(payload: any): Promise<{
        userId: any
        username: any
    }> {
        return { userId: payload.sub, username: payload.username }
    }

    public async isRegistered(token: string): Promise<boolean> {
        return (
            (await this.prismaService.token.findUnique({
                where: { token }
            })) != null
        )
    }

    public async create(user: User): Promise<Token> {
        const token = await this.prismaService.token.create({
            data: {
                token: this.jwtService.sign({ sub: user.id }),
                userId: user.id,
                expiresAt: new Date(
                    Date.now() +
                        ms(
                            this.configService.get<StringValue>(
                                'JWT_EXPIRES_IN',
                                '1h'
                            )
                        )
                )
            }
        })
        return token
    }

    public async deleteMany(user: User | null): Promise<void> {
        if (user != null) {
            await this.prismaService.token.deleteMany({
                where: { userId: user.id }
            })
        }
    }

    @Cron(CronExpression.EVERY_HOUR)
    public async deleteExpired(): Promise<void> {
        await this.prismaService.token.deleteMany({
            where: {
                expiresAt: {
                    lte: new Date()
                }
            }
        })
        console.log('Expired tokens have been deleted')
    }
}
