import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { Job } from '../../entities/jobsOffers.entity';
import { QuizResponse } from '../../entities/quiz/quizResponse.entity';
import { QuizSession } from '../../entities/quiz/quizSession.entity';

@Injectable()
@EntityRepository(QuizSession)
export class QuizSessionRepository extends Repository<QuizSession> {
  async finOneById(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(QuizSession, 'session')
      .leftJoinAndSelect('session.responses', 'responses')
      .where('session.id = :id', { id });
    return await queryBuilder.getOne();
  }

  async findAll() {
    const queryBuilder = getManager()
      .createQueryBuilder(QuizSession, 'session')
      .leftJoinAndSelect('session.responses', 'responses');
    return await queryBuilder.getMany();
  }

  async findByJob(jobId) {
    const queryBuilder = getManager()
      .createQueryBuilder(QuizSession, 'session')
      .leftJoinAndSelect('session.responses', 'responses')
      .leftJoinAndSelect('session.quiz', 'quiz')
      .leftJoinAndSelect('quiz.jobs', 'jobs')
      .where('session.jobId =:jobId', { jobId });
    return await queryBuilder.getMany();
  }

  async findByMission(missionId) {
    const queryBuilder = getManager()
      .createQueryBuilder(QuizSession, 'session')
      .leftJoinAndSelect('session.responses', 'responses')
      .leftJoinAndSelect('session.quiz', 'quiz')
      .leftJoinAndSelect('quiz.missions', 'missions')
      .where('session.missionId =:missionId', { missionId });
    return await queryBuilder.getMany();
  }


  
  async findBySessionById(sessionId) {
    const queryBuilder = getManager()
      .createQueryBuilder(QuizSession, 'session')
      .leftJoinAndSelect('session.responses', 'responses')
      .leftJoinAndSelect('session.quiz', 'quiz')
      .where('session.id =:sessionId', { sessionId });
    return await queryBuilder.getOne();
  }

}
