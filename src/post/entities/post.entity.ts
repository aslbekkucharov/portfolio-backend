import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  excerpt: string

  @Column({ default: true })
  isActive: boolean
}
