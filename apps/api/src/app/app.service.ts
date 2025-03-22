import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {}

    public getHello(): string {
        return `Application: ${this.configService.get<string>('APP_NAME')}`
    }
}
