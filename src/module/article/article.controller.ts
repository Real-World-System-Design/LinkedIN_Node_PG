import { Controller, Get } from '@nestjs/common';
import { Article } from 'src/entities/article.entity';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}

    @Get()
    async getAllArticles(): Promise<Article[]>{
        return await this.articleService.getAllArticles();
    }
}
