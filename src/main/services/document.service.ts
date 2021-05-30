import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { table } from 'console';
import { mergeMission } from 'src/helpers/user.helper';
import { DocumentDto } from 'src/models/document.dto';
import { UserRoles } from 'src/models/role.mode';
import { Document } from '../entities/document.entity';
import { DocumentRepository } from '../repositories/document.repository';
import { UserRepository } from '../repositories/user.repository';

import { UploadService } from './upload.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentRepository)
    private documentRepo: DocumentRepository,
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private uploadService: UploadService,
  ) { }




  async findById(id: number): Promise<Document> {
    const document = await this.documentRepo.findDocumentByID(id);
    if (!document) {
      throw new HttpException('doc not found', HttpStatus.BAD_REQUEST);
    }
    return document;
  }
  async update(document: Document) {
    return await this.documentRepo.save(document);
  }


  async createDocument(model: DocumentDto, attachment: any) {

    let file = '';
    const client = await this.userRepo.findOne({
      where: { id: model.clientId },
    });

    if (attachment) {
      file = this.uploadService.uploadFile(attachment, 'document');
    }
    const document = this.documentRepo.create({
      title: model.title,
      description: model.description,
      sujet: model.sujet,
      file,
      client,
      startDate: model.startDate,
      type: model.type,
      version: model.version
    });
    return await this.documentRepo.save(document);
  }


  async updateDocument(id: number, model: any) {
    const document = await this.findById(id);
    const {
      title,
      sujet,
      version,
      type,
      description
    } = model;
    const updated: Document = {
      ...document,
      title,
      sujet,
      version,
      type,
      description
    };
    return await this.update(updated);
  }


 


  async getAllDocumentList() {
    return await this.documentRepo.find();
  }

  async delete(id: number): Promise<any> {
    return await this.documentRepo.delete({ id });
  }
  async getDocumentByid(id) {
    return await this.documentRepo.getDocument(id);
  }

  async uploadDocument(file, docID) {
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    const document = await this.findById(docID);
    const path = this.uploadService.uploadFile(file, 'file');
    document.file = path;
    return await this.update(document);
  }
}
