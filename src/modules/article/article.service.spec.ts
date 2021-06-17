import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTypeOrmTestConfig } from '../../db.config';
import { Article } from '../../entities/article.entity';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
      imports: [
        TypeOrmModule.forRoot(createTypeOrmTestConfig()),
        TypeOrmModule.forFeature([Article])
      ]
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should give me the empty array initially', async () => {
    expect(await service.getAllArticles()).toEqual('[]');
  });
});
