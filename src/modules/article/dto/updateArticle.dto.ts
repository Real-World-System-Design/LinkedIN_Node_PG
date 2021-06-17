import { IsArray, IsNotEmpty } from "class-validator";

export class UpdateArticle{
    @IsNotEmpty()
    readonly title: string
    
    @IsNotEmpty()
    readonly body: string

    @IsNotEmpty()
    readonly description: string

    @IsNotEmpty()
    @IsArray()
    readonly tagList: string[]
}