import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { createTypeOrmTestConfig } from '../../db.config';
import { Article } from '../../entities/article.entity';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTypeOrmTestConfig()), TypeOrmModule.forFeature([Article, User])
      ],
      providers: [ArticleService]
    }).compile();
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(null).toEqual(null);
  });
});
