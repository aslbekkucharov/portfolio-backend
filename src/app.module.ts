import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { PostsModule } from './post/post.module'
import { Post } from './post/entities/post.entity'
import { UsersModule } from './users/users.module'
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 5432,
      type: 'postgres',
      host: 'localhost',
      synchronize: true,
      username: 'postgres',
      database: 'portfolio',
      password: 'Qwerty1234',
      entities: [Post, User],
    }),

    PostsModule,
    UsersModule,
    AuthModule
  ],
  providers: []
})

export class AppModule { }