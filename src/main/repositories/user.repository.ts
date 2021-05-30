import { User } from '../entities/user.entity';
import { getManager, Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { MissionStatus, UserRoles } from '../../models/role.mode';
import { Mission } from '../entities/mission.entity';
import { userInfo } from 'os';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor() {
    super();
  }
  select = [
    'user.id',
    'user.email',
    'user.username',
    'user.cv',
    'user.dateBirth',
    'user.tjme',
    'user.tjmd',
    'user.phonenumber',
    'user.firstName',
    'user.yearsExperience',
    'user.lastName',
    'user.role',
    'user.gender',
    'user.situation',
    'user.formation',
    'user.createdAt',
    'user.updatedAt',
  ];
  findByUserName(username: string) {
    return this.findOne({ username });
  }

  async findLikeUserName(username: string, page, limit) {
    const queryBuilder = getManager()
      .createQueryBuilder(User, 'user')
      .select(this.select)
      .where('user.username like :username', { username: `%${username}%` });
    return await paginate<User>(queryBuilder, { page, limit });
  }

  async findAll() {
    const queryBuilder = getManager()
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.certifs', 'certifs');
    return await queryBuilder.getMany();
  }

  async findUserByID(id) {
    const queryBuilder = getManager()
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.certifs', 'certifs')
      .where('user.id = :id', { id });
    return await queryBuilder.getOne();
  }

  async findByEmail(email) {
    const queryBuilder = getManager()
      .createQueryBuilder(User, 'user')
      .select([...this.select])
      .where('user.email = :email', { email });
    return await queryBuilder.getOne();
  }

  async updateVacations() {
    await getManager()
      .createQueryBuilder(User, 'user')
      .update(User)
      .set({ vacations: () => 'vacations + 2' })
      .where('user.vacations <= 30')
      .where('user.role = "EMPLOYEE"')
      .orWhere('user.role = "RH"')
      .orWhere('user.role = "commercial"')
      .execute();
  }

  async update6MonthVacations() {
    await getManager()
      .createQueryBuilder(User, 'user')
      .update(User)
      .set({ vacations: () => 'vacationmaladie + 5' })
      .where('user.vacationmaladie <= 10')
      .where('user.role = "EMPLOYEE"')
      .orWhere('user.role = "RH"')
      .orWhere('user.role = "commercial"')
      .execute();
  }

  async findByRole(role: string) {
    const queryBuilder = getManager()
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.skills', 'skills')
      .where('user.role = :role', { role });
    return await queryBuilder.getMany();
  }
  async findBySkills(labels: string[], mission: Mission) {
    const queryBuilder1 = getManager()
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.skills', 'skills')
      //.leftJoinAndSelect('mission.skills','missions')
      .leftJoinAndSelect('user.missions', 'missions')
      .where('skills.label IN (:labels)', { labels })
      .andWhere('user.role IN (:roles)', {
        roles: [UserRoles.PROVIDER, UserRoles.EMPLOYEE],
      })
      .andWhere('missions.status = :status', {
        status: MissionStatus.AVAILABLE,
      })
 
      .orWhere('missions.endDate < :startDate', {
        startDate: mission.startDate,
      })
      .orWhere('missions.startDate > :endDate', { endDate: mission.endDate });

    const queryBuilder2 = getManager()
      .createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.missions', 'missions')
      .loadRelationCountAndMap('user.nbm', 'user.missions')
      .where('skills.label IN (:labels)', { labels })
      .andWhere('user.role IN (:roles)', {
        roles: [UserRoles.PROVIDER, UserRoles.EMPLOYEE],
      });
    const result1: any = await queryBuilder1.getMany();
    const result2: any = (await queryBuilder2.getMany()).filter(user => {
      let ok = false;
      if (user['nbm'] == 0) {
        ok = true;
      }
      return ok;
    });
    let array3 = result1.concat(result2);
    array3 = array3.filter((item, index) => {
      return array3.indexOf(item) == index;
    });
    return array3;
  }
}
