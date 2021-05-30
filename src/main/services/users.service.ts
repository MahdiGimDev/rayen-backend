import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LoginUserModel, CreateUserDto } from '../../auth/auth.models';
import { hash } from 'bcrypt';
import { UserUpdateDto } from '../../models/user.dto';
import { mergeUser } from '../../helpers/user.helper';
import { UserRoles } from '../../models/role.mode';
import { SkillsRepository } from '../repositories/skills.repository';
import { MissionRepository } from '../repositories/mission.repository';
import * as fs from 'fs';
import * as uuidAPIKey from 'uuid-apikey';
import { environment } from '../../environments/environment';
import { MailerService } from './mail.service';
import { CertifsRepository } from '../repositories/certif.repository';
import { UploadService } from './upload.service';
@Injectable()
export class UsersService {
  select: any = [
    'email',
    'id',
    'role',
    'username',
    'firstName',
    'lastName',
    'salaire',
    'tjme',
    'tjmd',
    'phonenumber',
    'ville',
    'typep',
    'paysd',
    'pays',
    'cv',
   'adress',
    'file',
    'gender',
    'situation',
    'dateBirth',
    'formation',
    'yearsExperience',
    'createdAt',
    'updatedAt',
    'activated',
    'verified',
  ];
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SkillsRepository)
    private skillRepo: SkillsRepository,
    @InjectRepository(CertifsRepository)
    private certifRepo: CertifsRepository,
    @InjectRepository(MissionRepository)
    private missionRepository: MissionRepository,
    private mailService: MailerService,
    private uploadService: UploadService,
  ) {}

  async getAllUserList() {
    return await this.userRepository.findAll();
  }
  async getAllUserByRole(role: UserRoles) {
    return await this.userRepository.findByRole(role);
  }
  async getAllUsers(page, limit) {
    return await paginate<User>(
      this.userRepository,
      { page, limit },
      { select: this.select },
    );
  }

  async findByPayload({ email }): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async findByGoogleId(googleID): Promise<User> {
    return await this.userRepository.findOne({ where: { googleID } });
  }

  async updateUserVacations() {
    return await this.userRepository.updateVacations();
  }

  async updateUser6MonthVacations() {
    return await this.userRepository.update6MonthVacations();
  }

  async findByEmail(email): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findUserByID(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async uploadPhoto(file, userID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const user = await this.findById(userID);
    const path = this.uploadService.uploadFile(file, 'image');
    user.file = path;
    return await this.updateUser(user);
  }

  async uploadCv(file, userID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const user = await this.findById(userID);
    const path = this.uploadService.uploadFile(file, 'cv');
    user.cv = path;
    return await this.updateUser(user);
  }

  async uploadCertif(file, userID) {
    const user = await this.findById(userID);
    const path = this.uploadService.uploadFile(file, 'certiff');
    user.certiff = path;
    return await this.updateUser(user);
  }
  async getUsersBySkills(skills: string[], missionID) {
    const mission = await this.missionRepository.findMissionById(missionID);
    return await this.userRepository.findBySkills(skills, mission);
  }


  async getSkillsByUsers(skills: string[], userID) {
    const mission = await this.userRepository.findUserByID(userID);
    return await this.userRepository.findBySkills(skills,userID);
  }

  /*async getUsersByCertifs(certifs: string[], missionID) {
    const mission = await this.missionRepository.findMissionById(missionID);
    return await this.userRepository.findBycertifs(certifs, mission);
  }
*/

  async assignSkillToUser(userID, skillId) {
    const user = await this.findById(userID);
    const skill = await this.skillRepo.findOne({ where: { id: skillId } });
    user.skills = [...user.skills, skill];
    return await this.userRepository.save(user);
  }

  async assignCertifToUser(userID, certifId) {
    const user = await this.findById(userID);
    const certif = await this.certifRepo.findOne({ where: { id: certifId } });
    user.certifs = [...user.certifs, certif];
    return await this.userRepository.save(user);
  }

  async removeSkillFromUser(userID, skillId) {
    const user = await this.userRepository.findUserByID(userID);
    user.skills.filter(sk => {
      sk.id != skillId;
    });
    return await this.userRepository.save(user);
  }

  async enabledUser(id: number, activated: boolean): Promise<User> {
    const user = await this.findById(id);
    if (user.activated === activated) {
      throw new HttpException(
        'User Already ' + user.activated ? 'EnabLed' : 'Disabled',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.activated = activated;
    return await this.userRepository.save(user);
  }

  async updateProfile(id: number, model: any) {
    const user = await this.findById(id);
    let certifs = [];
    if (model.certifsIds) {
      certifs = await this.certifRepo.findByIds(model.certifsIds);
    }

    let skills = [];
    if (model.skillsIds) {
      skills = await this.skillRepo.findByIds(model.skillsIds);
    }
    const {
      firstName,
      lastName,
      pays,
      paysd,
      phonenumber,
      salaire,
      tjmd,
      tjme,
      username,
      email,
      immatricule,
      cin,
      gender,
      formation,
      situation,
      ville,
      adress,
      yearsExperience,
    } = model;

    const updated: User = {
      ...user,
      firstName,
      lastName,
      pays,
      skills,
      certifs,
      email,
      paysd,
      phonenumber,
      immatricule,
      cin,
      salaire,
      tjmd,
      tjme,
      username,
      gender,
      adress,
      formation,
      situation,
      ville,
      yearsExperience,
    };
    return await this.updateUser(updated);
  }

  getUsersByUserName(username: string, page, limit) {
    return this.userRepository.findLikeUserName(username, page, limit);
  }

  async findByLogin({ email }: LoginUserModel): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUser(user: User) {
    return await this.userRepository.save(user);
  }

  async create(userDto: CreateUserDto, image, resume): Promise<any> {
    let skills = [];
    let certifs = [];
    if (userDto.skillsIds) {
      skills = await this.skillRepo.findByIds(userDto.skillsIds);
    }
    if (userDto.certifsIds) {
      certifs = await this.certifRepo.findByIds(userDto.certifsIds);
    }
    const {
      firstName,
      lastName,
      username,
      ville,
      paysd,
      pays,
      salaire,
      yearsExperience,
      phonenumber,
      tjme,
      tjmd,
      vacations,
      vacationmaladie,
      cin,
      immatricule,
      typep,
      dateBirth,
      adress,
      startDate,
      gender,
      password,
      situation,
      email,
      role,
    } = userDto;
    // check if the user exists in the db
    if (userDto.confirmPassword !== userDto.password) {
      throw new HttpException('Password not matching', HttpStatus.BAD_REQUEST);
    }
    const userInDb = await this.userRepository.findOne({
      where: { email },
    });
    if (userInDb) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    let cv = '';
    let file = '';
    if (resume) {
      cv = this.uploadService.uploadFile(resume, 'cv');
    }
    if (image) {
      file = this.uploadService.uploadFile(image, 'img');
    }
    const user: User = await this.userRepository.create({
      username,
      password,
      firstName,
      lastName,
      salaire,
      yearsExperience,
      phonenumber,
      tjmd,
      tjme,
      cv,
      file, 
      dateBirth,
      vacations,
      startDate,
      vacationmaladie,
      cin,
      immatricule,
      email,
      situation,
      role,
      skills,
      certifs,
      ville,
      pays,
      adress,
      gender,
      paysd,
    });
    const newUser = await this.userRepository.save(user);
    try {
      await this.mailService.newRegisterMail(user, userDto.password);
    } catch (error) {
      console.log({ error });
    }
    return newUser;
  }

  async delete(id: number): Promise<any> {
    return await this.userRepository.delete({ id });
  }

  async updateUserPassword(user: User, password: string) {
    user.password = await hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpireAt = null;
    return await this.userRepository.save(user);
  }
}
