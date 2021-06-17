import { Controller, Get } from '@nestjs/common';
import { Skill } from '../../entities/skills.entity';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
    constructor(private readonly skillService: SkillService){}

    @Get()
    async getllSkills(): Promise<Skill[]>{
        return await this.skillService.getAllSkills();
    }
}
