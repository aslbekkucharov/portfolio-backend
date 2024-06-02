import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { PostsModule } from './post/post.module'
import { Post } from './post/entities/post.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 5432,
      entities: [Post],
      type: 'postgres',
      username: 'postgres',
      host: 'localhost',
      password: 'root',
      database: 'portfolio',
      synchronize: true,
    }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}