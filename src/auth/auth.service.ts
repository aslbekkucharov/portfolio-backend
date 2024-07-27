import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'

import * as bcrypt from 'bcrypt'
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
        const token = await this.generateToken(user)

        if (!user) {
            throw new UnauthorizedException()
        }

        return {
            token,
            id: user.id,
            name: user.name,
            role: user.role,
            username: user.username,
        }
    }

    async generateToken(user: SignInData) {
        const payload = { id: user.id, username: user.username, issuedAt: new Date() }
        return this.jwtService.sign(payload)
    }

    async createUser(payload: CreateUserDto) {

        const isUserExists = await this.userService.findOne(payload.username)

        if (isUserExists) {
            throw new BadRequestException('This username already exists')
        }

        const user = await this.userService.create(payload)
        const token = await this.generateToken(user)

        return {
            token,
            id: user.id,
            name: user.name,
            role: user.role,
            username: user.username
        }
    }

    async validateUser(payload: AuthPayload): Promise<SignInData | null> {
        const user = await this.userService.findOne(payload.username)

        if (!user) {
            throw new UnauthorizedException('Wrong credentials')
        }

        const isPasswordsMatch = await bcrypt.compare(payload.password, user?.password)

        if (user && isPasswordsMatch) {
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
