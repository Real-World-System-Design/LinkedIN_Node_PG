import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Article } from '../../entities/article.entity';
import { User } from '../user/user.decorator'
import { ArticleService } from './article.service';
import { ArticleData } from './dto/articleData.dto';
import { UpdateArticle } from './dto/updateArticle.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}

    @Get()
    @HttpCode(201)
    async getAllArticles(): Promise<Article[]>{
        return await this.articleService.getAllArticles();
    }
    @Get('get/:slug')
    @HttpCode(201)
    async getArticleBySlug(slug: string): Promise<Article> {
        return await this.articleService.getArticleBySlug(slug);
    }
    @Post('register')
    @HttpCode(201)
    async createArticle(@Body() data: ArticleData, @User('email') email: string): Promise<Article> {
        return await this.articleService.createArticle(data, email);
    }
    @Patch('update/:slug')
    @HttpCode(201)
    async updateArticle(@Param('slug') slug: string, @Body() data: UpdateArticle, @User('email') email: string): Promise<Article> {
        return await this.articleService.updateArticle(slug, data, email);
    }
    @Delete('delete/:slug')
    @HttpCode(201)
    async deleteArticle(@Param('slug') slug: string, @User('email') email: string) {
        return await this.articleService.deleteArticle(slug, email);
    }
}
