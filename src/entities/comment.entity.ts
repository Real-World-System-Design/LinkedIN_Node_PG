import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({type: 'text'})
    body: string

    @ManyToOne(() => User)
    author: User
}