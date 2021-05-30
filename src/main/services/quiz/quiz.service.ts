import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLevels } from '../../../models/role.mode';
import { PropositionRepository } from '../../repositories/quiz/proposition.repository';
import { QuestionRepository } from '../../repositories/quiz/question.repository';
import { QuizRepository } from '../../repositories/quiz/quiz.repository';
import { QuizResponseRepository } from '../../repositories/quiz/quizResponse.repository';
import { QuizSessionRepository } from '../../repositories/quiz/quizSession.repository';
import { SkillsRepository } from '../../repositories/skills.repository';
import { JobService } from '../jobsOffers.service';
import { UploadService } from '../upload.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository)
    private quizRepo: QuizRepository,
    @InjectRepository(QuestionRepository)
    private questionRepo: QuestionRepository,
    @InjectRepository(PropositionRepository)
    private propositionRepo: PropositionRepository,
    @InjectRepository(QuizSessionRepository)
    private sessionRepo: QuizSessionRepository,
    @InjectRepository(QuizResponseRepository)
    private responseRepo: QuizResponseRepository,
    @InjectRepository(SkillsRepository)
    private skillRepo: SkillsRepository,

    private uploadService: UploadService,
  ) {}

  async getAllQuiz() {
    return await this.quizRepo.getAllQuiz();
  }

  async getQuiz(quizID) {
    const quiz = await this.quizRepo.finOneById(quizID);
    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.BAD_REQUEST);
    }
    return quiz;
  }

  async getQuizBySkills(
    skills: string[] = [],
    level: UserLevels = UserLevels.JUNIOR,
  ) {
    return await this.quizRepo.findBySkills(skills, level);
  }

  async createQuiz(model) {
    const { title, level, skillIds, type } = model;
    let skills = [];
    if (skillIds) {
      skills = await this.skillRepo.findByIds(skillIds);
    }
    const quiz = this.quizRepo.create({
      title,
      skills,
      level,
      type,
    });
    return await this.quizRepo.save(quiz);
  }

  async addQuestions(quizID, models: Array<any>) {
    const quiz = await this.quizRepo.findOne({ where: { id: quizID } });
    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.BAD_REQUEST);
    }
    const questions = [];
    const promises = models.map(async model => {
      const { duration, score, text, propositions } = model;
      const question = await this.questionRepo.save(
        this.questionRepo.create({
          quiz,
          duration,
          score,
          text,
        }),
      );
      questions.push(question);
      propositions.map(async item => {
        const { text, valid } = item;
        await this.propositionRepo.save(
          this.propositionRepo.create({
            text,
            valid,
            question,
          }),
        );
      });
    });
    await Promise.all(promises);
    return questions;
  }

  async startQuizSession(quizID, model, file: any) {
    let cv = '';
    if (file) {
      cv = this.uploadService.uploadFile(file, 'quizSession');
    }
    const quiz = await this.quizRepo.finOneById(quizID);
    if (!quiz) {
      throw new HttpException(
        'le quiz est introuvable',
        HttpStatus.BAD_REQUEST,
      );
    }
    const {
      email,
      name,
      missionId,
      jobId,
      phone,
      adress,
      experience,
      profil,
      niveau,
    } = model;
    const quizSession = this.sessionRepo.create({
      email,
      name,
      missionId,
      jobId,
      cv,
      adress,
      niveau,
      experience,
      profil,
      phone,
      quiz,
    });
    const userInDb = await this.sessionRepo.findOne({
      where: { email },
    });
    if (userInDb) {
      throw new HttpException(
        'le propriétaire de cet Email a dèja passé le Test',
        HttpStatus.BAD_REQUEST,
      );
    }
    const session = await this.sessionRepo.save(quizSession);
    const responses = [];
    quiz.questions.map(async question => {
      responses.push(
        this.responseRepo.create({
          question: question.text,
          score: question.score,
          session,
          duration: question.duration,
          questionId: question.id,
        }),
      );
    });
    await this.responseRepo.save(responses);
    return session;
  }

  async getResponsesBySession(SessionID) {
    return await this.sessionRepo.finOneById(SessionID);
  }

  async getQuestionById(questionID) {
    return await this.questionRepo.finOneById(questionID);
  }

  async getSessions() {
    return await this.sessionRepo.findAll();
  }

  async getSessionByJob(jobId) {
    return await this.sessionRepo.findByJob(jobId);
  }
  
  async getSessionByMission(jobId) {
    return await this.sessionRepo.findByMission(jobId);
  }


  async getSessionById(sessionId) {
    return await this.sessionRepo.findBySessionById(sessionId);
  }

  async submitResponse(responseID, propositionIds: Array<any>) {
    const responseQuiz = await this.responseRepo.findOne({
      where: { id: responseID },
    });
    if (responseQuiz.answers) {
      throw new HttpException(
        'Question Already Answered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const question = await this.questionRepo.findOne({
      where: { id: responseQuiz.questionId },
    });
    if (!propositionIds.length) {
      propositionIds = [-1];
    }
    const propositions = await this.propositionRepo.getPropositionsByIds(
      propositionIds,
    );

    let result = true;
    if (!propositions.length) {
      result = false;
    }
    propositions.map(prop => {
      if (prop.question.id != responseQuiz.questionId) {
        throw new HttpException('Invalid Propositions', HttpStatus.BAD_REQUEST);
      }
      if (!prop.valid) {
        result = false;
      }
    });
    const responses = propositions.reduce(
      (array, item) => [...array, item.text],
      [],
    );
    responseQuiz.question = question.text;
    responseQuiz.score = question.score;
    responseQuiz.result = result ? question.score : 0;
    responseQuiz.answers = JSON.stringify(responses);
    return await this.responseRepo.save(responseQuiz);
  }
}
