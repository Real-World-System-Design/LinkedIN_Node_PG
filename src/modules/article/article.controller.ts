import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Article } from '../../entities/article.entity';
import { User } from '../user/user.decorator'
import { ArticleService } from './article.service';
import { ArticleData } from './dto/articleData.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}

    @Get()
    async getAllArticles(): Promise<Article[]>{
        return await this.articleService.getAllArticles();
    }
    @Post('register')
    @HttpCode(201)
    async createArticle(@Body() data: ArticleData, @User('email') email: string): Promise<Article> {
        return await this.articleService.createArticle(data, email);
    }
}
