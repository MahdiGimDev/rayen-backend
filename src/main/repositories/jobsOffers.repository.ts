import { getManager, Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Job } from '../entities/jobsOffers.entity';

  @Injectable()
  @EntityRepository(Job)
  export class JobRepository extends Repository<Job> {
    constructor() {
      super();
    }

    async getAll() {
      const queryBuilder = getManager()
        .createQueryBuilder(Job, 'job')
        .leftJoinAndSelect('job.skills', 'skills');
      return await queryBuilder.getMany();
    }

    async findJobById(id) {
      const queryBuilder = getManager()
        .createQueryBuilder(Job, 'job')
        .leftJoinAndSelect('job.skills', 'skills')
        .leftJoinAndSelect('job.quiz', 'quiz')
        .where('job.id = :id', { id });
      return await queryBuilder.getOne();
    }
  }
