import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'

import { Roles } from 'src/enums/roles.enum'
import { PostsService } from './post.service'
import { RoleGuard } from 'src/guards/role.guard'
import { AuthGuard } from 'src/guards/auth.guard'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { AllowedRoles } from 'src/decorators/role.decorator'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('create')
  @UseGuards(AuthGuard, RoleGuard)
  @AllowedRoles(Roles.ADMIN)
  create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  @AllowedRoles(Roles.ADMIN)
  update(@Param('id', ParseIntPipe) id: string, @Body(new ValidationPipe()) updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @AllowedRoles(Roles.ADMIN)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.remove(+id)
  }
}
