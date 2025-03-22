import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type Response } from 'express'
import * as ms from 'ms'
import { type StringValue } from 'ms'

@Injectable()
export class CookieService {
    constructor(private readonly configService: ConfigService) {}

    public create(name: string, token: string, response: Response): void {
        response.cookie(name, token, {
            expires: new Date(
                Date.now() +
                    ms(
                        this.configService.get<StringValue>(
                            'JWT_EXPIRES_IN',
                            '1h'
                        )
                    )
            ),
            httpOnly: true,
            secure: this.configService.get<string>('APP_ENV') === 'production',
            domain: this.configService.get<string>('APP_URL'),
            path: '/',
            sameSite: 'lax'
        })
    }

    public delete(name: string, response: Response): void {
        response.clearCookie(name, {
            domain: this.configService.get<string>('APP_URL'),
            path: '/'
        })
    }
}
