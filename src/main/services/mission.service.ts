import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serialize } from 'v8';
import { mergeMission } from '../../helpers/user.helper';
import { MissionStatus, UserRoles } from '../../models/role.mode';
import { MissionCreateDTO, MissionUpdateDTO } from '../../models/user.dto';
import { Mission } from '../entities/mission.entity';
import { MissionRepository } from '../repositories/mission.repository';
import { QuizRepository } from '../repositories/quiz/quiz.repository';
import { SkillsRepository } from '../repositories/skills.repository';
import { UserRepository } from '../repositories/user.repository';
import { MailerService } from './mail.service';
import { UploadService } from './upload.service';

@Injectable()
export class MissionService {
  constructor(
    @InjectRepository(MissionRepository)
    private missionRepository: MissionRepository,
    @InjectRepository(SkillsRepository)
    private skillRepo: SkillsRepository,
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private mailService: MailerService,
    private uploadService: UploadService,
    private quizRepo: QuizRepository,
  ) {


 

  }

  async uploadbonfile(file, userID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const mission = await this.findById(userID);
    const path = this.uploadService.uploadFile(file, 'bonfile');
    mission.bonfile = path;
    return await this.updateMission(mission);
  }

  async uploadTransport(file, missionID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const mission = await this.findById(missionID);
    const path = this.uploadService.uploadFile(file, 'transport');
    mission.transport = path;
    return await this.updateMission(mission);
  }

  async uploadLogement(file, missionID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const mission = await this.findById(missionID);
    const path = this.uploadService.uploadFile(file, 'logement');
    mission.logement = path;
    return await this.updateMission(mission);
  }

  async uploadPlanFile(file, missionID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const mission = await this.findById(missionID);
    const path = this.uploadService.uploadFile(file, 'planfile');
    mission.planfile = path;
    return await this.updateMission(mission);
  }

  async uploadDevise(file, missionID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const mission = await this.findById(missionID);
    const path = this.uploadService.uploadFile(file, 'devise');
    mission.devise = path;
    return await this.updateMission(mission);
  }

  async uploadVisa(file, missionID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const mission = await this.findById(missionID);
    const path = this.uploadService.uploadFile(file, 'visa');
    mission.visa = path;
    return await this.updateMission(mission);
  }

  /* async getAllMissionByStatus(status: MissionStatus) {
     return await this.missionRepository.findByStatus(status);
   }*/
  async getAllMissionByStatus(status: MissionStatus) {
    return await this.missionRepository.findByStatus(status);
  }

  async createMission(usercID, model: MissionCreateDTO, attachment: any) {
    let skills = [];
   

    if (model.skillsIds) {
      skills = await this.skillRepo.findByIds(model.skillsIds);
    }
    const client = await this.userRepo.findOne({
      where: { id: model.clientId },
    });
    if (!client) {
      throw new HttpException(
        'Mission must have a client',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (client.role != UserRoles.CLIENT) {
      throw new HttpException(
        'Mission Owner must be a client',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepo.findOne({
      where: { id: usercID },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    let planfile = '';
    if (attachment) {
      planfile = this.uploadService.uploadFile(attachment, 'mission');
    }
    const mission = this.missionRepository.create({
      title: model.title,
      skills,
      type: model.type,
      technologies: model.technologies,
      address: model.address,
      invoice: model.invoice,
      purchase: model.purchase,
      level: model.level,
      period: model.period,
      categorie: model.categorie,
      planfile,
      client,
      userc: user,
      startDate: model.startDate,
      endDate: model.endDate,
      description: model.description,
      status: MissionStatus.AVAILABLE,

    });
    console.log({ mission });

    return await this.missionRepository.save(mission);
  }

  

  async updateAllMission() {
    const missions: Mission[] = await this.missionRepository.findAllMissions();
    //  let mission: any = [];
    //  mission = this.getAllMissionList;
    for (const e of missions) {
      const date = new Date(); // Now
      date.setDate(date.getDate());
      console.log(date);
      const mission = await this.missionRepository.findMissionById(e.id);
      if (mission.endDate < date) {
        mission.status = MissionStatus.REALISE;
        await this.missionRepository.save(mission);
      } else if (mission.startDate < date && date < mission.endDate) {
        mission.status = MissionStatus.ENCOURS;
        await this.missionRepository.save(mission);
      }
    }
  }
  async getAllMissionList() {
    await this.updateAllMission();
    return await this.missionRepository.findAllMissions();
  }
  async getClientMissionList(id) {
    return await this.missionRepository.findMissionsByClient(id);
  }
  async getEmployeeMissionList(id) {
    return await this.missionRepository.findMissionsByEmployee(id);
  }

  ////
  async getOwnerMissionList(id) {
    return await this.missionRepository.findMissionsByOwner(id);
  }

  async delete(id: number): Promise<any> {
    return await this.missionRepository.delete({ id });
  }

  async editMission(id: number, model: MissionUpdateDTO) {
    const mission = await this.findById(id);
    const updated = mergeMission(mission, model);
    return await this.updateMission(updated);
  }
  async updateMission(mission: Mission) {
    return await this.missionRepository.save(mission);
  }

  async findById(id: number): Promise<Mission> {
    const mission = await this.missionRepository.findMissionById(id);

    if (!mission) {
      throw new HttpException('mission not found', HttpStatus.BAD_REQUEST);
    }
    return mission;
  }

  async addSuggestedUser(missionID, userId) {
    const mission = await this.findById(missionID);
    const user = await this.userRepo.findOne({ where: { id: userId } });
    try {
      const mail = await this.mailService.sendSuggestMissionMail(user, mission);
    } catch (error) {
      console.log({ error });
    }
    if (user.role != UserRoles.PROVIDER && user.role != UserRoles.EMPLOYEE) {
      throw new HttpException(
        'Mission Owner must be a PROVIDER/EMPLOYEE',
        HttpStatus.BAD_REQUEST,
      );
    }

    /*if (mission.status = MissionStatus.BLOCKED){

  const mail = await this.mailService.sendSuggestMissionMailBlock(user, mission);

}
if (mission.status = MissionStatus.CONFIRMED){

  const mail = await this.mailService.acceptationMissionConfirmed(user, mission);

}*/

    if (mission.suggestion) {
      mission.suggestion = [...mission.suggestion, user];
    } else {
      mission.suggestion = [user];
    }
    mission.status = MissionStatus.AVAILABLE;
    return await this.missionRepository.save(mission);
  }

  async removeSuggestedUser(missionID, userId) {
    const mission = await this.findById(missionID);
    const userID = +userId;
    mission.suggestion = mission.suggestion.filter(user => user.id != userID);
    if (mission.suggestion.length == 0) {
      mission.status = MissionStatus.AVAILABLE;
    }
    return await this.missionRepository.save(mission);
  }

  async refuseInvitationMission(missionID, userId) {
    const mission = await this.findById(missionID);
    const userID = +userId;
    mission.suggestion = mission.suggestion.filter(user => user.id != userID);
    if (mission.suggestion.length == 0) {
      mission.status = MissionStatus.AVAILABLE;
    }
    return await this.missionRepository.save(mission);
  }



  async removeUserFromMission(missionID) {
    const mission = await this.findById(missionID);
    mission.user = null;
    return await this.missionRepository.save(mission);
  }

  async assignSkillToMission(missionID, skillId) {
    const mission = await this.findById(missionID);
    const skill = await this.skillRepo.findOne({ where: { id: skillId } });
    mission.skills = [...mission.skills, skill];
    return await this.missionRepository.save(mission);
  }

  // 1 Accept Provider the mission
  async acceptMission(missionID, userId) {
    const mission = await this.findById(missionID);
    if (!mission.suggestion) {
      throw new HttpException(
        'Mission has no invitations',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (mission.status != MissionStatus.AVAILABLE) {
      throw new HttpException(
        'Mission Is not available',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = mission.suggestion.find(u => u.id == userId);
    if (!user) {
      throw new HttpException('User Is Not invited', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.mailService.acceptMissionMail(user, mission);
    } catch (error) {
      console.log({ error });
    }
    mission.status = MissionStatus.OPTION;
    mission.user = user;
    return await this.missionRepository.save(mission);
  }

    // 2 Block the mission to the user
  async lockMission(missionID) {
    const mission = await this.findById(missionID);

    if (!mission.user) {
      throw new HttpException(
        'Mission has not affected yet',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (mission.status != MissionStatus.OPTION) {
      throw new HttpException(
        'Mission has not in option yet',
        HttpStatus.BAD_REQUEST,
      );
    }
    mission.status = MissionStatus.BLOCKED;
    //await this.mailService.sendSuggestMissionMailBlock( user , mission)
    return await this.missionRepository.save(mission);
  }

  // 3.1 Confirm Mission
  async confirmMission(missionID) {
    const mission = await this.findById(missionID);

    if (!mission.user) {
      throw new HttpException(
        'Mission has not affected yet',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (mission.status != MissionStatus.BLOCKED) {
      throw new HttpException(
        'Mission has not blocked yet',
        HttpStatus.BAD_REQUEST,
      );
    }
    mission.status = MissionStatus.CONFIRMED;

    return await this.missionRepository.save(mission);
  }

  ////////////mission Status En cours ///////////

  async MissionEnCours(missionID) {
    const mission = await this.findById(missionID);

    if (!mission.user) {
      throw new HttpException(
        'Mission has not affected yet',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (mission.status != MissionStatus.CONFIRMED) {
      throw new HttpException(
        'Mission has not confirmed yet',
        HttpStatus.BAD_REQUEST,
      );
    }
    mission.status = MissionStatus.ENCOURS;

    return await this.missionRepository.save(mission);
  }

  async getMissionsByUserc(id) {
    const userInDb = await this.userRepo.findOne({
      where: { id },
    });
    if (!userInDb) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return await this.missionRepository.find({
      where: { userc: userInDb },
    });
  }

  // 3.2 Confirm Mission
  async cancelMission(missionID) {
    const mission = await this.findById(missionID);
    if (!mission.user) {
      throw new HttpException('Mission has no user', HttpStatus.BAD_REQUEST);
    }

    mission.status = MissionStatus.CANCELLED;
    return await this.missionRepository.save(mission);
  }

  // 4 Free Mission
  async freeMission(missionID) {
    const mission = await this.findById(missionID);
    if (mission.status == MissionStatus.CONFIRMED) {
      throw new HttpException(
        'Mission is already confirmed',
        HttpStatus.BAD_REQUEST,
      );
    }

    mission.user = null;
    mission.status = MissionStatus.AVAILABLE;
    return await this.missionRepository.save(mission);
  }

  async removeSkillFromUser(missionID, skillId) {
    const mission = await this.findById(missionID);
    mission.skills.filter(sk => {
      sk.id != skillId;
    });
    return await this.missionRepository.save(mission);
  }


  async removeQuizFromMission(missionId) {
    const mission = await this.findById(missionId);
    mission.quiz = null;
    return await this.missionRepository.save(mission);
  }
  async assignQuizToMission(missionId, quizId) {
    console.log({ missionId, quizId });
    const mission = await this.findById(missionId);
    const quiz = await this.quizRepo.findOne({ id: quizId });
    mission.quiz = quiz;
    return await this.missionRepository.save(mission);
  }
}
