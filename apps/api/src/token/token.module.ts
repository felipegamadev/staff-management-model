import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaModule } from '@/prisma/prisma.module'

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN')
                }
            }),
            inject: [ConfigService]
        }),
        PrismaModule
    ],
    providers: [TokenService],
    exports: [TokenService, JwtModule]
})
export class TokenModule {}
