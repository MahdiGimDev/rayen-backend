import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropositionRepository } from '../../repositories/quiz/proposition.repository';
import { QuestionRepository } from '../../repositories/quiz/question.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(PropositionRepository)
    private propositionRepo: PropositionRepository,

    @InjectRepository(QuestionRepository)
    private questionRepo: QuestionRepository,
  ) {}

  async deleteQuestion(questionID) {
    return await this.questionRepo.delete({ id: questionID });
  }

  async deleteProposition(propositionID) {
    return await this.propositionRepo.delete({ id: propositionID });
  }
}
