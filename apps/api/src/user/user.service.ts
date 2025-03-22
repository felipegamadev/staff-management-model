import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { type User } from '@prisma/client'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    public async findById(id: number): Promise<User | null> {
        return await this.prismaService.user.findUnique({
            where: { id }
        })
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.prismaService.user.findUnique({
            where: { email }
        })
    }

    public async create(
        name: string,
        email: string,
        password: string
    ): Promise<User> {
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id
        })
        return await this.prismaService.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    }
}
