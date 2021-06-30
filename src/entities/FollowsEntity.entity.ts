import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('follows')
export class FollowsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    followerId: string

    @Column()
    followingId: string
}