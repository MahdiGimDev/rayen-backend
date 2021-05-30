import { Injectable } from "@nestjs/common";
import { EntityRepository, getManager, Repository } from "typeorm";

import { Experience } from "../entities/experience.entity";




@Injectable()
@EntityRepository(Experience)
export class ExperienceRepository extends Repository<Experience> {
  constructor() {
    super();
  }


  async getExperience(id): Promise<Experience> {
    const queryBuilder = getManager()
      .createQueryBuilder(Experience, 'experience')
      .leftJoinAndSelect('experience.user', 'user')
      .where('experience.id = :id', { id });
    return await queryBuilder.getOne();
  }


  async findExperienceByEmployee(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Experience, 'experience')
      .innerJoin('experience.user', 'user', 'user.id = :id', {
        id,
      });

    return await queryBuilder.getMany();
  }


}