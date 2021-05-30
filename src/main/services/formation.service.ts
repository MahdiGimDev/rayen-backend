import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FormationDTO } from "src/models/formation.dto";
import { FormationExperienceType, FormationStatus1, FormationStatus2 } from "src/models/role.mode";
import { FormationRepository } from "../repositories/formation.repository";
import { UserRepository } from "../repositories/user.repository";
import { MailerService } from "./mail.service";







@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(FormationRepository)
    private formationRepository: FormationRepository,

    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private mailService: MailerService,
  ) {}

  async createFormationRequest(userID, model: FormationDTO) {
    const user = await this.userRepo.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const formation = this.formationRepository.create({
      title: model.title,
      speciality: model.speciality,
      description: model.description,
      file: model.file,
      post: model.post,
      establishment : model.establishment,
      period: model.period,
      startDate: model.startDate,
      endDate: model.endDate,
      status: FormationStatus1.PENDING,
      type2: model.type2,
     // status2: FormationStatus2.PENDING,
      type: model.type,
      categorie:model.categorie,
      user,
    });
    return await this.formationRepository.save(formation);
  }

  async getVacation(id) {
    return await this.formationRepository.getFormation(id);
  }

  async getFormationsByUser(id) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.formationRepository.find({
      where: { user },
    });
  }

  async getVacationsByUserByStatus(id, status: FormationStatus1) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.formationRepository.find({
      where: { user, status },
    });
  }

  async changeVacationStatus(formationID, status: FormationStatus1) {
    const vacation = await this.formationRepository.getFormation(formationID);
    if (!vacation) {
      throw new HttpException('Formation not found', HttpStatus.BAD_REQUEST);
    }
    if (vacation.status != FormationStatus1.PENDING) {
      throw new HttpException('Formation n est pas acceptée', HttpStatus.BAD_REQUEST);
    }
    if (status === FormationStatus1.ACCEPTED) {
      const user = vacation.user;
  
      this.userRepo.save(user);
    }
    vacation.status = status;
    return await this.formationRepository.save(vacation);
  }
  async getFormationsByStatus(status: FormationStatus1) {
    return await this.formationRepository.find({
      where: { status },
    });
  }

  async getAllFormations() {
    return await this.formationRepository.find();
  }

  async delete(id: number): Promise<any> {
    return await this.formationRepository.delete({ id });
  }
}
