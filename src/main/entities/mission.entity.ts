import { IsNotEmpty } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Double,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {
  MissionCategorie,
  MissionStatus,
  MissionType,
  UserLevels,
} from '../../models/role.mode';
import { BaseEntity } from '../../shared/basic.entity';
import { Administrative } from './administrative.entity';
import { Quiz } from './quiz/quiz.entity';
import { Skills } from './skills.entity';
import { User } from './user.entity';

@Entity()
export class Mission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  technologies: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  period: number;
  /*
    @Column()
    tva: number;
  
    @Column()
    tarifc: number;
  
    @Column()
    totalttc: number;
  
    @Column()
    totalht: number
  
  */

  @Column()
  address: string;

  @Column({
    default: 'false',
  })
  invoice: string;

  @Column({
    default: 'false',
  })
  purchase: string;

  @Column({ type: 'text' })
  description: string;

  /*@Column("decimal", { precision: 5, scale: 2 ,default:0,})
  frais: number;*/

  @Column({
    type: 'enum',
    enum: MissionType,
    default: MissionType.OTHER,
  })
  @IsNotEmpty()
  type: MissionType;

  @Column({
    default: '',
  })
  bonfile: string;

  @Column({ default: null })
  logement: string;

  @Column({ default: null })
  planfile: string;

  @Column({ default: null })
  devise: string;

  @Column({ default: null })
  transport: string;

  @Column({ default: null })
  visa: string;

  @Column({
    type: 'enum',
    enum: MissionStatus,
    default: MissionStatus.AVAILABLE,
  })
  @IsNotEmpty()
  status: MissionStatus;

  @Column({
    default: 'presence',
  })
  categorie: string;

  @Column({
    default: false,
  })
  generated?: boolean;

  @Column({
    type: 'enum',
    enum: UserLevels,
    default: UserLevels.JUNIOR,
  })
  @IsNotEmpty()
  level: UserLevels; // 'ADMIN'   | 'CLIENT'

  @ManyToMany(() => Skills)
  @JoinTable()
  skills: Skills[];

  @ManyToMany(() => User)
  @JoinTable()
  suggestion: User[];

  @ManyToOne(
    type => User,
    user => user.client_missions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  client: User;

  @ManyToOne(
    type => User,
    user => user.missions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  user: User;

  @ManyToOne(
    type => User,
    userc => userc.missionsc,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  userc: User;

  @ManyToOne(
    type => Quiz,
    quiz => quiz.missions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  quiz: Quiz;
}
