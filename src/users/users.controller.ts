import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/guards/auth.guard'

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @UseGuards(AuthGuard)
    @Get(':username')
    async findOne(@Param('username') username: string) {
        const user = await this.userService.findOne(username)

        return {
            id: user.id,
            role: user.role,
            name: user.name,
            username: user.username
        }
    }
}
