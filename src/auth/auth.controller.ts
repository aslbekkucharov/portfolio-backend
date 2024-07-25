import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthPayload } from 'src/types/auth'

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post()
    login(@Body(new ValidationPipe()) payload: AuthPayload) {
        return this.authService.authenticate(payload)
    }
}
