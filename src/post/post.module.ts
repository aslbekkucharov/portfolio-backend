import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostsService } from './post.service'
import { Post } from 'src/post/entities/post.entity'
import { PostsController } from './post.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, JwtService],
})
export class PostsModule { }
