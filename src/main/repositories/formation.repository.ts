import { Injectable } from "@nestjs/common";
import { EntityRepository, getManager, Repository } from "typeorm";
import { Formation } from "../entities/formation.entity";



@Injectable()
@EntityRepository(Formation)
export class FormationRepository extends Repository<Formation> {
  constructor() {
    super();
  }

  async getFormation(id): Promise<Formation> {
    const queryBuilder = getManager()
      .createQueryBuilder(Formation, 'formation')
      .leftJoinAndSelect('formation.user', 'user')
      .where('formation.id = :id', { id });
    return await queryBuilder.getOne();
  }


  async findFormationByEmployee(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Formation, 'formation')
      .innerJoin('formation.user', 'user', 'user.id = :id', {
        id,
      });

    return await queryBuilder.getMany();
  }


}