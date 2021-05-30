import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../shared/basic.entity';
import { Proposition } from './proposition.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class Question extends BaseEntity {
  @Column({ default: '' })
  type: string;

  @Column()
  text: string;

  @Column({ default: '60', type: 'float' })
  duration: number; // seconds

  @Column({ default: '5', type: 'float' })
  score: number;

  @OneToMany(
    type => Proposition,
    proposition => proposition.question,
  )
  @JoinTable()
  propositions: Proposition[];

  @ManyToOne(
    type => Quiz,
    quiz => quiz.questions, { onDelete: "CASCADE" }
  )
  @JoinColumn()
  quiz: Quiz;
}
