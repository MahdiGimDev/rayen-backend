import { getManager, Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Mission } from '../entities/mission.entity';
import { MissionStatus } from 'src/models/role.mode';

@Injectable()
@EntityRepository(Mission)
export class MissionRepository extends Repository<Mission> {
  constructor() {
    super();
  }

  async findAllMissions() {
    const queryBuilder = getManager()
      .createQueryBuilder(Mission, 'mission')
      .leftJoinAndSelect('mission.user', 'user')
      .leftJoinAndSelect('mission.client', 'client')
      .leftJoinAndSelect('mission.skills', 'skills')
      .leftJoinAndSelect('mission.suggestion', 'suggestion');

    return await queryBuilder.getMany();
  }

  async findMissionsByClient(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Mission, 'mission')
      .leftJoinAndSelect('mission.client', 'client')
      .leftJoinAndSelect('mission.skills', 'skills')
      .leftJoinAndSelect('mission.suggestion', 'suggestion')
      .innerJoin('mission.user', 'user', 'user.id = :id', {
        id,
      });

    return await queryBuilder.getMany();
  }

  async findMissionsByEmployee(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Mission, 'mission')
      .leftJoinAndSelect('mission.user', 'user')
      .leftJoinAndSelect('mission.client', 'client')
      .leftJoinAndSelect('mission.skills', 'skills')
      .innerJoin('mission.suggestion', 'suggestion', 'suggestion.id = :id', {
        id,
      });

    return await queryBuilder.getMany();
  }

  async findMissionsByOwner(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Mission, 'mission')
      .leftJoinAndSelect('mission.userc', 'userc')
      .leftJoinAndSelect('mission.client', 'client')
      .leftJoinAndSelect('mission.skills', 'skills')
      .innerJoin('mission.suggestion', 'suggestion', 'suggestion.id = :id', {
        id,
      });

    return await queryBuilder.getMany();
  }

  async findMissionById(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Mission, 'mission')
      .leftJoinAndSelect('mission.user', 'user')
      .leftJoinAndSelect('mission.client', 'client')
      .leftJoinAndSelect('mission.skills', 'skills')
      .leftJoinAndSelect('mission.suggestion', 'suggestion')
      .leftJoinAndSelect('mission.quiz', 'quiz')
      .leftJoinAndSelect('mission.userc', 'userc')
      .where('mission.id = :id', { id });
     
     
    return await queryBuilder.getOne();
  }


  async findMissionByUsercId(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Mission, 'mission')
      .leftJoinAndSelect('mission.user', 'user')
      .leftJoinAndSelect('mission.client', 'client')
      .leftJoinAndSelect('mission.skills', 'skills')
      .leftJoinAndSelect('mission.suggestion', 'suggestion')
      .innerJoin('mission.user', 'user', 'user.id = :id', {
        id,
      })
      .where('mission.user = :id', { id });
     
     
    return await queryBuilder.getMany();
  }



  async findByStatus(status: string) {
    const queryBuilder = getManager()
      .createQueryBuilder(Mission, 'mission')
      .leftJoinAndSelect('mission.skills', 'skills')
      .where('mission.status = :status', { status });
    return await queryBuilder.getMany();
  }


}
