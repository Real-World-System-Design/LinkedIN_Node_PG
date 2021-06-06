import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("skills")
export class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', nullable: true})
    name: string
}