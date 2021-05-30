import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/basic.entity';
import { Question } from './question.entity';

@Entity()
export class Proposition extends BaseEntity {
  @Column()
  text: string;
  @Column({ default: false })
  valid: boolean;
  @ManyToOne(
    type => Question,
    question => question.propositions,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  question: Question;
}
