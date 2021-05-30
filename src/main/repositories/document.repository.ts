import { Injectable } from "@nestjs/common";
import { EntityRepository, getManager, Repository } from "typeorm";
import { Document } from "../entities/document.entity";




@Injectable()
@EntityRepository(Document)
export class DocumentRepository extends Repository<Document> {


    constructor() {
        super();
      }
      async getDocument(id): Promise<Document> {
        const queryBuilder = getManager()
          .createQueryBuilder(Document, 'document')
        //  .leftJoinAndSelect('document.user', 'user')
          .where('document.id = :id', { id });
        return await queryBuilder.getOne();
      }

      async findDocumentByID(id) {
        const queryBuilder = getManager()
          .createQueryBuilder(Document, 'document')
          .where('document.id = :id', { id });
        return await queryBuilder.getOne();
      }



      async findDocumentsByClient(id) {
        const queryBuilder = getManager()
          .createQueryBuilder(Document, 'document')
          .leftJoinAndSelect('document.client', 'client')
          //.leftJoinAndSelect('document.skills', 'skills')
          .leftJoinAndSelect('document.suggestion', 'suggestion')
          .innerJoin('document.user', 'user', 'user.id = :id', {
            id,
          });
    
        return await queryBuilder.getMany();
      }


      async findDocumentsByProvider(id) {
        const queryBuilder = getManager()
          .createQueryBuilder(Document, 'document')
          .leftJoinAndSelect('document.provider', 'provider')
          //.leftJoinAndSelect('document.skills', 'skills')
          .leftJoinAndSelect('document.suggestion', 'suggestion')
          .innerJoin('document.user', 'user', 'user.id = :id', {
            id,
          });
    
        return await queryBuilder.getMany();
      }


      
    /*  async findVacationByEmployee(id) {
        const queryBuilder = getManager()
          .createQueryBuilder(Document, 'document')
          .innerJoin('document.user', 'user', 'user.id = :id', {
            id,
          });
    
        return await queryBuilder.getMany();
      }*/
      
}