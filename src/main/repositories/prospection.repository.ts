import { Injectable } from "@nestjs/common";
import { EntityRepository, getManager, Repository } from "typeorm";

import { Prospection } from "../entities/prospection.entity";





@Injectable()
@EntityRepository(Prospection)
export class ProspectionRepository extends Repository<Prospection> {


    constructor() {
        super();
      }

  
    
    
      async findProspectByID(id) {
        const queryBuilder = getManager()
          .createQueryBuilder(Prospection, 'prospection')
          .where('prospection.id = :id', { id });
        return await queryBuilder.getOne();
      }
    
    
    
    
      }


