import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createTypeOrmProdConfig } from './db.config';
import { UserModule } from './module/user/user.module';
import { SkillModule } from './module/skill/skill.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(createTypeOrmProdConfig()), SkillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
