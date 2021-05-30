import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { title } from 'process';
import { JobCreateDTO } from 'src/models/jobsOffers.dto';
import { JobStatus } from 'src/models/role.mode';

import { Job } from '../entities/jobsOffers.entity';
import { JobRepository } from '../repositories/jobsOffers.repository';
import { QuizRepository } from '../repositories/quiz/quiz.repository';

import { SkillsRepository } from '../repositories/skills.repository';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
    @InjectRepository(SkillsRepository)
    private skillRepo: SkillsRepository,
    @InjectRepository(QuizRepository)
    private quizRepo: QuizRepository,
  ) {}

  async createJob(model: JobCreateDTO) {
    let skills = [];
    if (model.skillsIds) {
      skills = await this.skillRepo.findByIds(model.skillsIds);
    }

    const job = await this.jobRepository.create({
      title: model.title,
      profil: model.profil,
      poste: model.poste,
      specialite: model.specialite,
      formation: model.formation,
      skills,
      startDate: model.startDate,
      level: model.level,
      addresse: model.addresse,
      contrat: model.contrat,
      description: model.description,
      ville: model.ville,
      pays: model.pays,
      status: JobStatus.FINDING,
    });

    return await this.jobRepository.save(job);
  }

  async getAllJobList() {
    return await this.jobRepository.getAll();
  }
  async delete(id: number): Promise<any> {
    return await this.jobRepository.delete({ id });
  }

  async findById(id: number): Promise<Job> {
    const job = await this.jobRepository.findJobById(id);
    if (!job) {
      throw new HttpException('job offer not found', HttpStatus.BAD_REQUEST);
    }
    return job;
  }

  async assignSkillToJob(jobID, skillId) {
    const job = await this.findById(jobID);
    const skill = await this.skillRepo.findOne({ where: { id: skillId } });
    job.skills = [...job.skills, skill];
    return await this.jobRepository.save(job);
  }
  async removeSkillFromUser(jobID, skillId) {
    const job = await this.findById(jobID);
    job.skills.filter(sk => {
      sk.id != skillId;
    });
    return await this.jobRepository.save(job);
  }
  async removeQuizFromJob(jobID) {
    const job = await this.findById(jobID);
    job.quiz = null;
    return await this.jobRepository.save(job);
  }
  async assignQuizToJob(jobID, quizID) {
    const job = await this.findById(jobID);
    const quiz = await this.quizRepo.findOne({ id: quizID });
    job.quiz = quiz;
    return await this.jobRepository.save(job);
  }
}
