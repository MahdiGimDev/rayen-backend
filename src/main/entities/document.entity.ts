import { BaseEntity } from 'src/shared/basic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentType, DocumentVersion } from '../../models/role.mode';
import { User } from './user.entity';

@Entity()
export class Document extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  sujet: string;

  @Column({
    default: '',
  })
  file: string;

  @Column({
    type: 'enum',
    enum: DocumentType,
    default: DocumentType.FACTURE,
  })
  type: DocumentType;

  @Column({
    type: 'enum',
    enum: DocumentVersion,
    default: DocumentVersion.REMPLIE,
  })
  version: DocumentVersion;

  @Column()
  startDate: Date;

  @Column({ default: 'text' })
  description: string;

  @ManyToOne(
    type => User,
    user => user.client_documents,
  )
  @JoinColumn() 
  client: User;
}
