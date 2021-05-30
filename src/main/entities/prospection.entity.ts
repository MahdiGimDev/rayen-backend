import { IsNotEmpty, Length } from "class-validator";
import { ProspectStatus } from "src/models/role.mode";
import {  Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BaseEntity } from 'src/shared/basic.entity';

@Entity()
export class Prospection extends BaseEntity {

@PrimaryGeneratedColumn()
id:number;

 @Column({
    default: '',
  })
  nom: string;

  @Column({
    default: ' ',
  })
  secteur: string;


  @Column({
    type: 'enum',
    enum: ProspectStatus,
    default: ProspectStatus.SUCCEE,
  })
  @IsNotEmpty()
  status1: string;
 
  @Column({default: null,})
  endDate: Date;

  @Column({
    default: '',
  })
  address: string;

  @Column({
    default: '',
  })
  sujet: string;

  @Column({
    default: '',
  })
  description: string;

  @Column()
  phonenumber: string;

  

  @Column()
  @Length(4, 100)
  email: string;
}
