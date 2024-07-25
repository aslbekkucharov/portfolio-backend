import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UsersService } from 'src/users/users.service'
import { AuthPayload, AuthResult, SignInData } from 'src/types/auth'
import { JwtService } from '@nestjs/jwt'

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

    async validateUser(payload: AuthPayload): Promise<SignInData | null> {
        const user = await this.userService.findOne(payload.username)

        if (user && user.password === payload.password) {
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
