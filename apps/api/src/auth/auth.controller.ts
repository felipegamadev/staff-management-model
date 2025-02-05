import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './auth.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(
        @Body() registerDto: RegisterDto,
        @Res() response: Response
    ): Promise<Response> {
        const statusCode = HttpStatus.CREATED
        const user = await this.authService.register(registerDto)
        return response.status(statusCode).json({
            message: 'Register successful',
            statusCode,
            user
        })
    }
}
