import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'

import { Post } from './src/post/entities/post.entity'
import { User } from './src/users/entities/user.entity'

const dbOptions: DataSourceOptions = {
    type: 'postgres',
    synchronize: false,
    migrationsRun: true,
    entities: [Post, User],
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    migrations: ['src/migrations/*.ts']
}

const dataSource = new DataSource(dbOptions)

dataSource.initialize().then(() => console.log('Connected successfully')).catch(() => console.log('Unable to connect'))

export default dataSource