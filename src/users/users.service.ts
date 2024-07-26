import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async create(user: CreateUserDto): Promise<User | undefined> {
        const hashedPassword = await bcrypt.hash(user.password, +this.configService.get<string>('PASSWORD_SALT'))
        return this.userRepository.save({ ...user, password: hashedPassword })
    }

    async findOne(username: string): Promise<User | undefined> {
        const foundUser = await this.userRepository.findOneBy({ username })

        if (!foundUser) {
            throw new NotFoundException()
        }

        return foundUser
    }
}