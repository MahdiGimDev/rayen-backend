import { Injectable } from '@nestjs/common';
import { EntityRepository, getManager, Repository } from 'typeorm';
import { Question } from '../../entities/quiz/question.entity';

@Injectable()
@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  constructor() {
    super();
  }

  async finOneById(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Question, 'question')
      .leftJoinAndSelect('question.propositions', 'propositions')
      .where('question.id = :id', { id });
    return await queryBuilder.getOne();
  }
}
