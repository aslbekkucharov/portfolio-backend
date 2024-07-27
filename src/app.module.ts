import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { PostsModule } from './post/post.module'
import { Post } from './post/entities/post.entity'
import { UsersModule } from './users/users.module'
import { User } from './users/entities/user.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      port: 5432,
      type: 'postgres',
      host: 'localhost',
      synchronize: true,
      username: 'postgres',
      database: 'portfolio',
      password: 'root',
      entities: [Post, User],
    }),

    PostsModule,
    UsersModule,
    AuthModule
  ],
  providers: []
})

export class AppModule { }