import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/basic.entity';
import { Quiz } from './quiz.entity';
import { QuizResponse } from './quizResponse.entity';

@Entity()
export class QuizSession extends BaseEntity {

  
  @Column({ default: '' })
  type: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  adress: string;

  @Column()
  niveau: string;

  @Column()
  profil: string;

  @Column()
  experience: number;

  @Column({
    default: 'pas de mention',
  })
  mention: string;

  @Column({ default: null })
  missionId: number;

  @Column({ default: null })
  jobId: number;

  @Column()
  cv: string;

  @Column()
  phone: string;

  @Column({ default: false })
  finished: boolean;

  @ManyToOne(
    type => Quiz,
    quiz => quiz.session,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  quiz: Quiz;

  @OneToMany(
    type => QuizResponse,
    response => response.session,
    { onDelete: 'CASCADE' },
  )
  responses: QuizResponse[];
}
