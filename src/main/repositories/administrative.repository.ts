import { Injectable } from "@nestjs/common";
import { EntityRepository, getManager, Repository } from "typeorm";
import { Administrative } from "../entities/administrative.entity";



@Injectable()
@EntityRepository(Administrative)
export class AdministrativeRepository  extends Repository<Administrative> {

    constructor() {
        super();
      }
      /*
    async getAdministrative(id): Promise<Administrative> {
        const queryBuilder = getManager()
          .createQueryBuilder(Administrative, 'administrative')
         .leftJoinAndSelect('administrative.mission', 'mission')
          .where('administrative.id = :id', { id });
        return await queryBuilder.getOne();
      }



      async findAdministrativeByID(id) {
        const queryBuilder = getManager()
          .createQueryBuilder(Administrative, 'administrative')
          .where('administrative.id = :id', { id });
        return await queryBuilder.getOne();
      }


    
  async findAdministrativeByMission(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Administrative, 'administrative')
      .innerJoin('administrative.mission', 'mission', 'mission.id = :id', {
        id, 
      });

    return await queryBuilder.getMany();
  }*/

    }