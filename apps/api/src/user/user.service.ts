import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { type User } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    public async create(name: string, email: string): Promise<User> {
        return await this.prismaService.user.create({
            data: {
                name,
                email
            }
        })
    }
}
