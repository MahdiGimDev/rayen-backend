import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';
import { QuizResponse } from '../../entities/quiz/quizResponse.entity';

@Injectable()
@EntityRepository(QuizResponse)
export class QuizResponseRepository extends Repository<QuizResponse> {
  
}
