import { Injectable } from '@nestjs/common';
import { EntityRepository, getManager, Repository } from 'typeorm';
import { Vacation } from '../entities/vacation.entity';

@Injectable()
@EntityRepository(Vacation)
export class VacationRepository extends Repository<Vacation> {
  constructor() {
    super();
  }

  async getVacation(id): Promise<Vacation> {
    const queryBuilder = getManager()
      .createQueryBuilder(Vacation, 'vacation')
      .leftJoinAndSelect('vacation.user', 'user')
      .where('vacation.id = :id', { id });
    return await queryBuilder.getOne();
  }

  async findVacationByEmployee(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Vacation, 'vacation')
      .innerJoin('vacation.user', 'user', 'user.id = :id', {
        id,
      });

    return await queryBuilder.getMany();
  }
}
