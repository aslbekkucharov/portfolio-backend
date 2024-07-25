import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common'
import { PostsService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('create')
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
  update(@Param('id', ParseIntPipe) id: string, @Body(new ValidationPipe()) updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.postsService.remove(+id)
  }
}
