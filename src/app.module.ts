import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { PostsModule } from './post/post.module'
import { Post } from './about/entities/about.entity'
import { UsersModule } from './users/users.module'
import { User } from './users/entities/user.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AboutModule } from './about/about.module';
import { ExperienceModule } from './experience/experience.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: false,
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
    AboutModule,
    ExperienceModule,
  ],
  providers: [],
})
export class AppModule { }
