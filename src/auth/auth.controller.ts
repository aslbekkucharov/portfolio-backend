import { Body, Controller, Param, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthPayload } from 'src/types/auth'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  login(@Body(new ValidationPipe()) payload: AuthPayload) {
    return this.authService.authenticate(payload)
  }

  @Post('signup')
  signup(@Body(new ValidationPipe()) payload: CreateUserDto) {
    return this.authService.createUser(payload)
  }
}
