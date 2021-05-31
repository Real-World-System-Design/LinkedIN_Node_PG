import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    email: string

    @Column({type: 'text', nullable: false})
    username: string

    @Column({type: 'text', nullable: true})
    password?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    constructor(email: string, username: string, password: string) {
        this.username = username
        this.password = password
        this.email = email
    }
}