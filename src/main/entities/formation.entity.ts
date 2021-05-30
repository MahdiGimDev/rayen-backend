import { IsNotEmpty } from "class-validator";
import { FormationType, FormationStatus1, FormationStatus2,FormationExperienceType } from "src/models/role.mode";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";




@Entity()
export class Formation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  speciality: string;

  @Column()
  description: string;

  @Column()
  categorie: string;

  @Column({
    type: 'enum',
    enum: FormationType,
    default: FormationType.UNIV,
  })
  @IsNotEmpty()
  type: FormationType;


  @Column({
    type: 'enum',
    enum: FormationExperienceType,
    default: FormationExperienceType.FORMATION,
  })
  @IsNotEmpty()
  type2: FormationExperienceType;

  @Column(({
    default: 'Ingenieur dev',
  }))
  post: string;

  @Column(({
    default: 'UBCI',
  }))
  establishment: string;

  @Column({
    type: 'enum',
    enum: FormationStatus1,
    default: FormationStatus1.PENDING,
  })
  @IsNotEmpty()
  status: FormationStatus1;

 /* @Column({
    type: 'enum',
    enum: FormationStatus2,
    default: FormationStatus2.PENDING,
  })
  @IsNotEmpty()
  status2: FormationStatus2;
  */

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
    user => user,{ onDelete: "CASCADE" }
  )
  @JoinColumn()
  user: User;
}
