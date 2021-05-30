import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/basic.entity';
import { QuizSession } from './quizSession.entity';

@Entity()
export class QuizResponse extends BaseEntity {
  @Column()
  question: string;




  @Column({ nullable: true, default: null })
  answers: string;

  @Column()
  score: number;

  @Column({ default: 0 })
  result: number;

  @Column({ nullable: true })
  questionId: number;

  @Column()
  duration: number;
  @ManyToOne(
    type => QuizSession,
    session => session.responses, { onDelete: "CASCADE" }
  )
  @JoinColumn()
  session: QuizSession;
}
