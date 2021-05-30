import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { EntityRepository, getManager, Repository } from 'typeorm';
import { Skills } from '../entities/skills.entity';

@Injectable()
@EntityRepository(Skills)
export class SkillsRepository extends Repository<Skills> {
  constructor() {
    super();
  }
  select: ['id:number', 'label:string', 'description:string'];
  findSkillsByLabel(label: string) {
    return this.findOne({ label });
  }
  async findLikelabel(label: string, page, limit) {
    //queryBuilder permet le filtrage dynamique des données ,getManger permet d'effectuer des operations sur toutes les entités
    const queryBuilder = getManager()
      .createQueryBuilder(Skills, 'skills')
      .select(this.select)
      .where('skills.label like :label', { label: `%${label}%` });
    return await paginate<Skills>(queryBuilder, { page, limit });
  }
  async findSkillsByID(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Skills, 'skills')
      .where('skills.id = :id', { id });
    return await queryBuilder.getOne();
  }
  async findSkillByLabel(label) {
    const queryBuilder = getManager()
      .createQueryBuilder(Skills, 'skill')
      .where('LOWER(skill.label) = LOWER(:label)', { label });
    return await queryBuilder.getOne();
  }
}
