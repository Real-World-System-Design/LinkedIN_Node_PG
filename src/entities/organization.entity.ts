import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("organizations")
export class Organization{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', nullable: true})
    name: string

    @Column({type: 'date'})
    startYear: Date

    @Column({type: 'text'})
    endYear: Date
}