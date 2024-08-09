import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { PostsModule } from './post/post.module'
import { Post } from './post/entities/post.entity'
import { UsersModule } from './users/users.module'
import { User } from './users/entities/user.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<string>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [Post, User],
      }),
      inject: [ConfigService],
    }),

    PostsModule,
    UsersModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule { }
