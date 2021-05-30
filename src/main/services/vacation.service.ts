import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacationStatus1 } from '../../models/role.mode';
import { VacationDTO } from '../../models/vacation.dto';
import { Vacation } from '../entities/vacation.entity';
import { UserRepository } from '../repositories/user.repository';
import { VacationRepository } from '../repositories/vacation.repository';
import { MailerService } from './mail.service';
import { UploadService } from './upload.service';

@Injectable()
export class VacationService {
  constructor(
    @InjectRepository(VacationRepository)
    private vacationRepository: VacationRepository,
    private uploadService: UploadService,
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private mailService: MailerService,
  ) {}

  async createVacationRequest (userID, model: VacationDTO, attachement:any)
   {
    const user = await this.userRepo.findOne({
      where: { id: userID },
    });
    let file = '';
 if (attachement){
   file = this.uploadService.uploadFile(attachement, 'vacation')
 }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const vacation = this.vacationRepository.create({
      title: model.title,
      file,
      period: model.period,
      startDate: model.startDate,
      endDate: model.endDate,
      status: VacationStatus1.PENDING,
      type: model.type,
      user,
    });
    return await this.vacationRepository.save(vacation);
  }

  async getVacation(id) {
    return await this.vacationRepository.getVacation(id);
  }

 
  async uploadfile(file, vacationId) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const vacation = await this.findById(vacationId);
    const path = this.uploadService.uploadFile(file, 'file');
    vacation.file = path;
    return await this.updateVacation(vacation);
  }


  async updateVacation(vacation: Vacation) {
    return await this.vacationRepository.save(vacation);
  }


  async findById(id: number): Promise<Vacation> {
    const vacation = await this.vacationRepository.findOne(id);

    if (!vacation) {
      throw new HttpException('vacation not found', HttpStatus.BAD_REQUEST);
    }
    return vacation;
  }



  async getVacationsByUserByStatus(id, status: VacationStatus1) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.vacationRepository.find({
      where: { user, status },
    });
  }

  async changeVacationStatus(vacationID, status: VacationStatus1) {
    const vacation = await this.vacationRepository.getVacation(vacationID);
    if (!vacation) {
      throw new HttpException('Demande repos non trouvée', HttpStatus.BAD_REQUEST);
    }
    if (vacation.status != VacationStatus1.PENDING) {
      throw new HttpException('Demande repos n est pas encore acceptée', HttpStatus.BAD_REQUEST);
    }
   
    if (status === VacationStatus1.ACCEPTED) {
      const user = vacation.user;
      user.vacations = user.vacations - vacation.period;
      this.userRepo.save(user);
    }
    
    vacation.status = status;
    return await this.vacationRepository.save(vacation);
  }
  async getVacationsByStatus(status: VacationStatus1) {
    return await this.vacationRepository.find({
      where: { status },
    });
  }

  async getAllVacations() {
    return await this.vacationRepository.find();
  }
  async getVacationsByUser(id) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return await this.vacationRepository.find({
      where: { user },
    });
  }

  async delete(id: number): Promise<any> {
    return await this.vacationRepository.delete({ id });
  }
}
