import { Injectable } from "@nestjs/common";
import { paginate } from "nestjs-typeorm-paginate";
import { EntityRepository, getManager, Repository } from "typeorm";
import { Certifs } from "../entities/certif.entity";


@Injectable()
@EntityRepository(Certifs)
export class CertifsRepository extends Repository<Certifs> {
  constructor() {
    super();
  }
  select: ['id:number', 'label:string', 'description:string'];
  findCertifsByLabel(label: string) {
    return this.findOne({ label });
  }
  async findLikelabel(label: string, page, limit) {
    //queryBuilder permet le filtrage dynamique des données ,getManger permet d'effectuer des operations sur toutes les entités
    const queryBuilder = getManager()
      .createQueryBuilder(Certifs, 'certifs')
      .select(this.select)
      .where('certifs.label like :label', { label: `%${label}%` });
    return await paginate<Certifs>(queryBuilder, { page, limit });
  }
  async findCertifsByID(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(Certifs, 'certifs')
      .where('certifs.id = :id', { id });
    return await queryBuilder.getOne();
  }
  async findCertifByLabel(label) {
    const queryBuilder = getManager()
      .createQueryBuilder(Certifs, 'certifs')
      .where('LOWER(certifs.label) = LOWER(:label)', { label });
    return await queryBuilder.getOne();
  }
}
