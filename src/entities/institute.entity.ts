import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("institutes")
export class Institute{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', nullable: true})
    name: string

    @Column({type: 'date'})
    startYear: Date

    @Column({type: 'text'})
    endYear: Date
}