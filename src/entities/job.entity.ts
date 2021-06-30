import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', nullable: false})
    title: string
    
    @Column({type: 'text', nullable: false})
    description: string

    @Column({type: 'text'})
    jobType: string

    @ManyToOne(() => User)
    author: User
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}