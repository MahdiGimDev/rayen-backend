import { Injectable } from '@nestjs/common';
import { EntityRepository, getManager, Repository } from 'typeorm';
import { Prospection } from '../../entities/prospection.entity';
import { Proposition } from '../../entities/quiz/proposition.entity';

@Injectable()
@EntityRepository(Proposition)
export class PropositionRepository extends Repository<Proposition> {
  async getPropositionsByIds(ids) {
    const queryBuilder = getManager()
      .createQueryBuilder(Proposition, 'proposition')
      .leftJoinAndSelect('proposition.question', 'question')
      .where('proposition.id IN (:ids)', { ids });

    return await queryBuilder.getMany();
  }
}
