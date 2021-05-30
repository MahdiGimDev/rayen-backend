import { IsNotEmpty } from 'class-validator';
import {
  JobsOffersStatus,
  JobStatus,
  TypeContrat,
  UserLevels,
} from 'src/models/role.mode';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz/quiz.entity';
import { Skills } from './skills.entity';

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  profil: string;

  @Column()
  poste: string;

  @Column()
  formation: string;

  @Column()
  specialite: string;

  @Column()
  startDate: Date;

  @Column({ default: '' })
  pays: string;
  @Column({ default: '' })
  ville: string;

  @Column()
  addresse: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TypeContrat,
    default: TypeContrat.Cdi,
  })
  @IsNotEmpty()
  contrat: TypeContrat;

  @Column({
    type: 'enum',
    enum: UserLevels,
    default: UserLevels.JUNIOR,
  })
  @IsNotEmpty()
  level: UserLevels; // 'ADMIN'   | 'CLIENT'

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.FINDING,
  })
  @IsNotEmpty()
  status: JobStatus;

  @ManyToMany(() => Skills)
  @JoinTable()
  skills: Skills[];

  @ManyToOne(
    type => Quiz,
    quiz => quiz.jobs,{ onDelete: "CASCADE" }
  )
  @JoinColumn()
  quiz: Quiz;
}
