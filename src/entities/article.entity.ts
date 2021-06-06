import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity('articles')
export class Article {   
    @PrimaryColumn({length: 40})
    slug: string
    
    @Column({length: 50})
    title?: string
    
    @Column({length: 100, nullable: true})  
    description: string
    
    @Column({type: 'text'})
    body:string   
    
    @Column({type: 'text', nullable:true})
    tagList?: string[]

    @Column({default:0})
    favoritesCount?: number

    @Column({type: 'text'})
    name?: string
   
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User)
    author: User
}
