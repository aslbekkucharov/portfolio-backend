import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findOne(username: string): Promise<User | undefined> {
        const foundUser = await this.userRepository.findOneBy({ username })

        if (!foundUser) {
            throw new NotFoundException()
        }

        return foundUser
    }
}