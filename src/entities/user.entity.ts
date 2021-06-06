import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Institute } from "./institute.entity";
import { Organization } from "./organization.entity";
import { Skill } from "./skills.entity";

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

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[]

    @ManyToMany(() => Organization)
    @JoinTable()
    organizations: Organization[]

    @ManyToMany(() => Institute)
    @JoinTable()
    institutes: Institute[]
}