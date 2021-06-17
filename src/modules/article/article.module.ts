import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../entities/article.entity';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule implements NestModule{
  public configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      {path: 'articles', method: RequestMethod.POST},
      {path: 'articles', method: RequestMethod.PATCH}
    );
  }
}
