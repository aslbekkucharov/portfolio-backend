import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UsersService } from 'src/users/users.service'
import { AuthPayload, AuthResult, SignInData } from 'src/types/auth'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async authenticate(payload: AuthPayload): Promise<AuthResult> {
        const user = await this.validateUser(payload)

        if (!user) {
            throw new UnauthorizedException()
        }

        return {
            id: 1,
            name: '',
            role: '',
            token: '',
            username: '',
        }
    }

    async signIn() {
        return
    }

    async createUser(payload: CreateUserDto) {
        return this.userService.create(payload)
    }

    async validateUser(payload: AuthPayload): Promise<SignInData | null> {
        const user = await this.userService.findOne(payload.username)

        console.log(await this.jwtService.verifyAsync(user.password))

        return null

        if (user && await this.jwtService.verifyAsync(user.password)) {
            return {
                id: user.id,
                role: user.role,
                name: user.name,
                username: user.username
            }
        }

        return null
    }
}
