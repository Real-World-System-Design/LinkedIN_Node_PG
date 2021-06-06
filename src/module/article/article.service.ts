import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article) private readonly articleRepo: Repository<Article>){}

    async getAllArticles(): Promise<Article[]>{
        return await this.articleRepo.find();
    }
}
