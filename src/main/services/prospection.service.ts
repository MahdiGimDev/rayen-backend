import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { prospectDto } from "src/models/prospect.dto";
import { ProspectStatus } from "src/models/role.mode";
import { Prospection } from "../entities/prospection.entity";
import { ProspectionRepository } from "../repositories/prospection.repository";



@Injectable()
export class ProspectionService {
  constructor(
    @InjectRepository(ProspectionRepository)
    private prosRepository: ProspectionRepository,

   
  ) {}


  async createProspect (model:prospectDto){

    const prosp = await this.prosRepository.create({

    nom:model.nom,
    secteur:model.secteur,
    address:model.address,
    sujet:model.sujet,
    phonenumber:model.phonenumber,
    email:model.email,
    description:model.description,
    endDate:model.endDate,
    status1:model.status1,

    });
    console.log({prosp});
    return await this.prosRepository.save(prosp);
    
  }

  async getAllProspectionList() {
    return await this.prosRepository.find();
  }


 
  async updateMission(pros: Prospection) {
    return await this.prosRepository.save(pros);
  }



  async delete(id: number): Promise<any> {
    return await this.prosRepository.delete({ id });
  }


  async findById(id:number): Promise<Prospection> {
    const pros = await this.prosRepository.findProspectByID(id);
    if (!pros) {
      throw new HttpException('Prospect not found', HttpStatus.BAD_REQUEST);
    }
    return pros;
  }

  async update(model:Prospection){
    const prosp= await this.prosRepository.save(model);

  }

  async updateProspect(id: number, model: any) {
    const prospect = await this.findById(id);
    const {
      nom,
      secteur,
      status1,
      endDate,
      address,
      sujet,
      description,
      phonenumber,
      email
    } = model;
    const updated: Prospection = {
      ...prospect,
      nom,
      secteur,
      status1,
      endDate,
      address,
      sujet,
      description,
      phonenumber,
      email
    };
    console.log("edit back-end:"+ updated);
    return await this.update(updated);
   
  }





  





}

