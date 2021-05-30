import { IsNotEmpty } from "class-validator";
import { ContratType,ExperienceStatus1 } from "src/models/role.mode";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";






@Entity()
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  pays: string;

  @Column()
  adress: string;

  @Column()
  ville: string;

 
  @Column()
  poste: string;


  @Column()
  grade: string;

  @Column()
  etablissement: string;

  @Column()
  speciality: string;

 

  @Column({
    type: 'enum',
    enum: ContratType,
    default: ContratType.CDI,
  })
  @IsNotEmpty()
  type: ContratType;

  @Column({
    type: 'enum',
    enum: ExperienceStatus1,
    default: ExperienceStatus1.PENDING,
  })
  @IsNotEmpty()
  status: ExperienceStatus1;

  @Column({
    default: null,
  })
  startDate: Date;

  @Column({
    default: null,
  })
  endDate: Date;

  @Column({
    default: 'vide',
  })
  file: string;

  @Column({
    default: 'vide',
  })
  description: string;


  @Column({ default: 0 })
  period: number; // days

  @ManyToOne(
    type => User,
    user => user, { onDelete: "CASCADE" }
  )
  @JoinColumn()
  user: User;
}
