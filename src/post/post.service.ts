import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Post } from 'src/post/entities/post.entity'
import { CreatePostDto } from 'src/post/dto/create-post.dto'
import { UpdatePostDto } from 'src/post/dto/update-post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) { }

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto)
  }

  async findAll(): Promise<Omit<Post, 'content'>[]> {
    const posts = await this.postRepository.find({ order: { createdDate: 'DESC' } })

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      isActive: post.isActive,
      createdDate: post.createdDate
    }))
  }

  async findOne(id: number): Promise<Post | null> {
    const foundPost = await this.postRepository.findOneBy({ id })

    if (!foundPost) {
      throw new NotFoundException('Пост с указанным ID не найден')
    }

    return this.postRepository.findOneBy({ id })
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post[]> {
    await this.postRepository.update({ id }, updatePostDto)
    return this.postRepository.findBy({ id })
  }

  async remove(id: number): Promise<Post[]> {
    const postToRemove = await this.postRepository.findBy({ id })
    return this.postRepository.remove(postToRemove)
  }
}
