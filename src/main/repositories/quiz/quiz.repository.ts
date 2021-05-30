import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { UserLevels } from '../../../models/role.mode';
import { Quiz } from '../../entities/quiz/quiz.entity';

@Injectable()
@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {
  async getAllQuiz() {
    const queryBuilder = getManager()
      .createQueryBuilder(Quiz, 'quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('quiz.skills', 'skills');
    return await queryBuilder.getMany();
  }
  async finOneById(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Quiz, 'quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('quiz.skills', 'skills')
      .leftJoinAndSelect('questions.propositions', 'propositions')
      .where('quiz.id = :id', { id });
    return await queryBuilder.getOne();
  }
  async findBySkills(labels: string[], level: UserLevels) {
    const queryBuilder = getManager()
      .createQueryBuilder(Quiz, 'quiz')
      .leftJoinAndSelect('quiz.skills', 'skills')
      .where('skills.label IN (:labels)', { labels })
      .andWhere('quiz.level = :level', { level });
    return queryBuilder.getMany();
  }
}
