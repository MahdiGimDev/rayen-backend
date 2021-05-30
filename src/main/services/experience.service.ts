import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/user.repository";
import { MailerService } from "./mail.service";
import { ExperienceRepository } from "../repositories/experience.repository";
import { ExperienceDTO } from "src/models/experience.dto";

import { ExperienceStatus1 } from "src/models/role.mode";




@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(ExperienceRepository)
    private experienceRepository: ExperienceRepository,

    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private mailService: MailerService,
  ) {}

  async createFormationRequest(userID, model: ExperienceDTO) {
    const user = await this.userRepo.findOne({
      where: { id: userID },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const vacation = this.experienceRepository.create({
      title: model.title,
      speciality: model.speciality,
      ville: model.ville,
      pays: model.pays,
      poste : model.poste,
      adress: model.adress,
      etablissement : model.etablissement,
      file: model.file,
      grade : model.grade,
      period: model.period,
      description: model.description,
      startDate: model.startDate,
      endDate: model.endDate,
      status: ExperienceStatus1.PENDING,
      type: model.type,
      user,
    });
    return await this.experienceRepository.save(vacation);
  }

  async getVacation(id) {
    return await this.experienceRepository.getExperience(id);
  }

  async getVacationsByUser(id) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.experienceRepository.find({
      where: { user },
    });
  }

  async getVacationsByUserByStatus(id, status: ExperienceStatus1) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.experienceRepository.find({
      where: { user, status },
    });
  }

  async changeVacationStatus(formationID, status: ExperienceStatus1) {
    const vacation = await this.experienceRepository.getExperience(formationID);
    if (!vacation) {
      throw new HttpException('Experience not found', HttpStatus.BAD_REQUEST);
    }
    if (vacation.status != ExperienceStatus1.PENDING) {
      throw new HttpException('Experience n est pas acceptée', HttpStatus.BAD_REQUEST);
    }
    if (status === ExperienceStatus1.ACCEPTED) {
      const user = vacation.user;
      user.vacations = user.vacations - vacation.period;
      this.userRepo.save(user);
    }
    vacation.status = status;
    return await this.experienceRepository.save(vacation);
  }
  async getExperiencesByStatus(status: ExperienceStatus1) {
    return await this.experienceRepository.find({
      where: { status },
    });
  }

  async getAllExperiences() {
    return await this.experienceRepository.find();
  }

  async delete(id: number): Promise<any> {
    return await this.experienceRepository.delete({ id });
  }
}
