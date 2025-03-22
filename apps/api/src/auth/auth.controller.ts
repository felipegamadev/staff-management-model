import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { LoginDto, RegisterDto } from './auth.dto'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get('profile')
    public async profile(
        @Req() request: Request,
        @Res() response: Response
    ): Promise<void> {
        const user = await this.authService.profile(request)
        response.json({
            message: 'Success',
            user
        })
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<void> {
        await this.authService.login(loginDto, response)
        response.json({
            message: 'Login successful'
        })
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    public async register(
        @Body() registerDto: RegisterDto,
        @Res() response: Response
    ): Promise<void> {
        await this.authService.register(registerDto)
        response.json({
            message: 'Register successful'
        })
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('logout')
    public async logout(
        @Req() request: Request,
        @Res() response: Response
    ): Promise<void> {
        await this.authService.logout(request, response)
        response.json({
            message: 'Logout successful'
        })
    }
}
