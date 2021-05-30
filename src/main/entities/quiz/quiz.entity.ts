import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { UserLevels } from '../../../models/role.mode';
import { BaseEntity } from '../../../shared/basic.entity';
import { Job } from '../jobsOffers.entity';
import { Mission } from '../mission.entity';

import { Skills } from '../skills.entity';
import { Question } from './question.entity';
import { QuizSession } from './quizSession.entity';

@Entity()
export class Quiz extends BaseEntity {
  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  type: string;

  @OneToMany(
    type => Question,
    question => question.quiz,
  )
  questions: Question[];

  @OneToMany(
    type => QuizSession,
    session => session.quiz,
  )
  session: QuizSession[];

  @Column({
    type: 'enum',
    enum: UserLevels,
    default: UserLevels.JUNIOR,
  })
  @IsNotEmpty()
  level: UserLevels; // 'JUNIOR'   | 'SENIOR' | 'EXPERT'

  @ManyToMany(() => Skills)
  @JoinTable()
  skills: Skills[];

  @OneToMany(
    type => Job,
    job => job.quiz,
  )
  jobs: Job[];

  @OneToMany(
    type => Mission,
    missions => missions.quiz,
  )
  missions: Job[];

}
