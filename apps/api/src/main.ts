import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { useContainer } from 'class-validator'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())
    useContainer(app.select(AppModule), { fallbackOnErrors: true })

    await app.listen(3333)
}
void bootstrap()
