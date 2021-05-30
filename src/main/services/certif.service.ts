import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { mergeCertifs } from "src/helpers/user.helper";
import { CertifsDto, CertifsUpdateDTO } from "src/models/certifs.dto";
import { Certifs } from "../entities/certif.entity";
import { CertifsRepository } from "../repositories/certif.repository";
import { UserRepository } from "../repositories/user.repository";

Injectable();
export class CertifsService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(CertifsRepository)
    private certifRepo: CertifsRepository,
  ) {}

  async createCertifs(model: CertifsDto) {
    const skill = await this.certifRepo.findCertifsByLabel(model.label);
    if (skill != null) {
      throw new HttpException('certification label already exist', HttpStatus.BAD_REQUEST);
    }
    

    const certifs = this.certifRepo.create({
      label: model.label,
      description: model.description,
    });
    return await this.certifRepo.save(certifs);
  }

  async getAllCertifsList() {
    return await this.certifRepo.find();
  }

  async delete(id: number): Promise<any> {
    return await this.certifRepo.delete({ id });
  }

  async editCertifs(id: number, model: CertifsUpdateDTO) {
    const certifs = await this.findById(id);
    const updated = mergeCertifs(certifs, model);
    return await this.updateCertifs(updated);
  }

  async updateCertifs(certifs: Certifs) {
    return await this.certifRepo.save(certifs);
  }

  async findById(id: number): Promise<Certifs> {
    const certifs = await this.certifRepo.findCertifsByID(id);
    if (!certifs) {
      throw new HttpException('certifs not found ', HttpStatus.BAD_REQUEST);
    }
    return certifs;
  }













}
