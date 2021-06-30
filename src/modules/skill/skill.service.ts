import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../../entities/skills.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
    constructor(@InjectRepository(Skill) private readonly skillRepo: Repository<Skill>){}

    async getAllSkills(): Promise<Skill[]>{
        return await this.skillRepo.find();
    }
}