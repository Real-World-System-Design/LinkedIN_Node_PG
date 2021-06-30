import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities/article.entity';
import { Repository } from 'typeorm';
import { ArticleData } from './dto/articleData.dto';
import { validate } from 'class-validator';
import { slugify } from '../../utils/stringUtils';
import { sanitization } from '../../utils/security';
import { User } from '../../entities/user.entity';
import { UpdateArticle } from './dto/updateArticle.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepo: Repository<Article>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ){}

    async getAllArticles(): Promise<Article[]>{
        return await this.articleRepo.find();
    }
    async getArticleBySlug(slug: string): Promise<Article> {        
        const requestedArticle = await this.articleRepo.findOne(slug);
        if(!requestedArticle) throw new HttpException("Article with this given slug not exists", HttpStatus.NOT_FOUND);
    
        return requestedArticle;
    }
    //TODO: Implemet find article by feed
    //TODO: convert the primary key to a uuid or a oneauth id 
    // async findArticleByFeed(userId: number):Promise<Article> {

    // }
    async createArticle(data: ArticleData, email: string): Promise<Article> {
        const {title, body, description, tagList} = data;
        const user = await this.userRepo.findOne(email);
        if(!user) throw new HttpException("User with this email not found", HttpStatus.NOT_FOUND);
        
        const article = new Article();
        article.slug = slugify(title);
        article.title = title;
        article.body = body;
        article.description = description;
        article.tagList = tagList;
        article.author = sanitization(user)
        const errors = await validate(article);
        if(errors.length > 0){
            const _errors = {error: "Input data validation failed"}
            throw new HttpException(_errors, HttpStatus.BAD_REQUEST);
        }else{
            const newArticle = await this.articleRepo.save(article);
            return (newArticle);
        }
    }
    async updateArticle(slug: string, data: UpdateArticle, email: string): Promise<Article> {
        const {title, description, body, tagList} = data;
        const user = await this.userRepo.findOne(email);
        if(!user) throw new HttpException("User with this email not found", HttpStatus.NOT_FOUND);
        
        const requestedArticle = await this.articleRepo.findOne(slug);
        if(!requestedArticle) throw new HttpException("Article with this given slug not exists", HttpStatus.NOT_FOUND);
        const article = new Article();
        if(title) article.slug = slugify(title);
        if(body) article.body = body;
        if(title) article.title = title;
        if(tagList) article.tagList = tagList;
        if(description) article.description = description;
        
        const errors = await validate(article);
        if(errors.length > 0) {
            const _error = {message: "Input validation failed"};
            throw new HttpException(_error, HttpStatus.BAD_REQUEST);
        }else{
            const updatedArticle= await this.articleRepo.save(article);
            return updatedArticle;
        }
    }
    async deleteArticle(slug: string, email: string) {
        const user = await this.userRepo.findOne(email);
        if(!user) throw new HttpException("User with this email not found", HttpStatus.NOT_FOUND);
        
        const requestedArticle = await this.articleRepo.findOne(slug);
        if(!requestedArticle) throw new HttpException("Article with this given slug not exists", HttpStatus.NOT_FOUND);
        return await this.articleRepo.delete(requestedArticle);    
    } 
}
