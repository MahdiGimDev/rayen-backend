import { BaseEntity } from "src/shared/basic.entity";
import {  Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mission } from "./mission.entity";

@Entity()
export class Administrative extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  

  @Column({ default: null })
  bonfile: string;

  @Column({ default: null })
  logement: string;



  @Column({ default: null })
  devise: string;


 @Column({ default: null })
  transport: string;

  
 @Column({ default: null })
 visa: string;

 /*@OneToOne(() => Mission, mission => mission.administrative) // specify inverse side as a second parameter
 mission: Mission;
 */

}