import {
  Entity,
  Column,
  Unique,
  BeforeInsert,
  Double,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Length, IsNotEmpty } from 'class-validator';
import { UserFormation, UserRoles, TypeProvider } from '../../models/role.mode';
import { hash } from 'bcrypt';
import { BaseEntity } from '../../shared/basic.entity';
import { Skills } from './skills.entity';
import { Mission } from './mission.entity';
import { Document } from './document.entity';

import { Certifs } from './certif.entity';

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @Column()
  @Length(4, 20)
  username: string;
  @Column({
    default: '',
  })
  firstName: string;

  @Column({
    default: 'ho',
  })
  gender: string;

  @Column({
    type: 'enum',
    enum: TypeProvider,
    default: TypeProvider.PHYSIQUE,
  })
  @IsNotEmpty()
  typep: TypeProvider;

  @Column({
    default: '',
  })
  lastName: string;

  @Column()
  startDate: Date;

  @Column({
    default: 'Tunisie',
  })
  pays: string;

  @Column({
    default: 'defaultpaysdorigine',
  })
  paysd: string;

  @Column({
    default: '',
  })
  adress: string;

  @Column({
    default: 'defaulville',
  })
  ville: string;

  @Column({
    default: '',
  })
  cv: string;

  @Column({
    default: '',
  })
  certiff: string;

  @Column()
  phonenumber: string;

  @Column({
    default: null,
  })
  dateBirth: Date;

  @Column({ default: 0 })
  salaire: number;

  @Column({ default: 0 })
  vacationmaladie: number;

  @Column({ default: "003322" })
  cin: string;

  @Column({ default: "011" })
  immatricule: string;


  @Column({ default: 0 })
  yearsExperience: number;

  @Column({ default: 0 })
  tjme: number;

  @Column({ default: 0 })
  tjmd: number;

  @Column({ default: 0 })
  vacations: number;

  @Column()
  @Length(4, 100)
  email: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column({ default: null })
  googleID: string;

  @Column({ default: true })
  activated: boolean;

  @Column({ default: true })
  verified: boolean;

  @Column({ default: null })
  file: string;

  @Column({ default: null })
  situation: string;

  @Column({ default: null })
  resetPasswordToken: string;

  @Column({ default: null })
  resetPasswordExpireAt: Date;

  @Column({ default: null })
  verifyToken: string;

  @Column({ default: null })
  verifyExpireAt: Date;

  @Column({ default: 'bac+5' })
  formation: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.CLIENT,
  })
  @IsNotEmpty()
  role: UserRoles;

  @ManyToMany(() => Skills)
  @JoinTable()
  skills: Skills[];

  @ManyToMany(() => Certifs)
  @JoinTable()
  certifs: Certifs[];

  @OneToMany(
    type => Mission,
    mission => mission.client,
    { onDelete: "CASCADE" }
  )
  client_missions: Mission[];




  @OneToMany(
    type => Document,
    mission => mission.client, { onDelete: "CASCADE" }
  )
  client_documents: Document[];


  @OneToMany(
    type => Mission,
    mission => mission.user, { onDelete: "CASCADE" }
  )
  missions: Mission[];


  /* @OneToMany(
     type => Document,
     document => document.user,
   )
   documents: Document[];
 
 */

  @OneToMany(
    type => Mission,
    missionc => missionc.user, { onDelete: "CASCADE" }

  )
  missionsc: Mission[];

  @BeforeInsert()
  hashPassword?= async () => {
    this.password = await hash(this.password, 10);
  };
}
