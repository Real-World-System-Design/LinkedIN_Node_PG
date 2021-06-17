import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities/article.entity';
import { Repository } from 'typeorm';
import { ArticleData } from './dto/articleData.dto';
import { validate } from 'class-validator';
import { slugify } from '../../utils/stringUtils';
import { sanitization } from '../../utils/security';
import { User } from '../../entities/user.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private readonly articleRepo: Repository<Article>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}

    async getAllArticles(): Promise<Article[]>{
        return await this.articleRepo.find();
    }
    async createArticle(data: ArticleData, email: string): Promise<Article> {
        const {title, body, description} = data;
        const user = await this.userRepo.findOne(email);
        if(!user) throw new HttpException("User with this email not found", HttpStatus.NOT_FOUND);
        
        const article = new Article();
        article.slug = slugify(title);
        article.title = title;
        article.body = body;
        article.description = description;
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
}
