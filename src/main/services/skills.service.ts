import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mergeSkills } from 'src/helpers/user.helper';
import { SkillsDto, SkillsUpdateDTO } from 'src/models/skills.dto';
import { Skills } from '../entities/skills.entity';

import { SkillsRepository } from '../repositories/skills.repository';
import { UserRepository } from '../repositories/user.repository';

Injectable();
export class SkillsService {
  constructor(
    @InjectRepository(SkillsRepository)
    private skillRepo: SkillsRepository,
  ) {}

  async createSkills(model: SkillsDto) {
    const skill = await this.skillRepo.findSkillByLabel(model.label);
    if (skill != null) {
      throw new HttpException(
        'skill label already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const skills = this.skillRepo.create({
      label: model.label,
      description: model.description,
    });
    return await this.skillRepo.save(skills);
  }

  async getAllSkillsList() {
    return await this.skillRepo.find();
  }

  async delete(id: number): Promise<any> {
    return await this.skillRepo.delete({ id });
  }

  async editSkills(id: number, model: SkillsUpdateDTO) {
    const skills = await this.findById(id);
    const updated = mergeSkills(skills, model);
    return await this.updateSkills(updated);
  }

  async updateSkills(skills: Skills) {
    return await this.skillRepo.save(skills);
  }

  async findByIds(id: number[]): Promise<Array<Skills>> {
    const skills = await this.skillRepo.findByIds(id);
    if (!skills) {
      throw new HttpException('skills not found ', HttpStatus.BAD_REQUEST);
    }
    return skills;
  }

  async findById(id: number): Promise<Skills> {
    const skills = await this.skillRepo.findSkillsByID(id);
    if (!skills) {
      throw new HttpException('skills not found ', HttpStatus.BAD_REQUEST);
    }
    return skills;
  }
}
