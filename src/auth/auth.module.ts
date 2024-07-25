import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersService,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    })
  ],
})

export class AuthModule { }
