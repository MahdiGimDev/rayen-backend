import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VacationType, VacationStatus1 } from '../../models/role.mode';
import { BaseEntity } from '../../shared/basic.entity';
import { User } from './user.entity';

@Entity()
export class Vacation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: VacationType,
    default: VacationType.SICKNESS,
  })
  @IsNotEmpty()
  type: VacationType;

  @Column({
    type: 'enum',
    enum: VacationStatus1,
    default: VacationStatus1.PENDING,
  })
  @IsNotEmpty()
  status: VacationStatus1;

  @Column({
    default: null,
  })
  startDate: Date;

  @Column({
    default: null,
  })
  endDate: Date;

  @Column({
    default: '',
  })
  file: string;

  @Column({ default: 0 })
  period: number; // days

  @ManyToOne(
    type => User,
    user => user.client_missions,{onDelete:"CASCADE"}
  )
  @JoinColumn()
  user: User;
}
