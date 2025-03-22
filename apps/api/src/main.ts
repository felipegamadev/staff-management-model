import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'
import * as cookieParser from 'cookie-parser'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const origin = configService.get<string>('CORS_ORIGIN') ?? ''
    const port = configService.get<number>('APP_PORT') ?? 3333

    app.useGlobalPipes(new ValidationPipe())
    useContainer(app.select(AppModule), { fallbackOnErrors: true })

    app.enableCors({
        origin,
        credentials: true
    })

    app.use(cookieParser())

    await app.listen(port)
}
void bootstrap()
