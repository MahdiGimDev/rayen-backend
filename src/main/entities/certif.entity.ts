import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['label'])
export class Certifs extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({default: '',} )
    label: string;
  
    @Column({default: '',} )
    description: string;


}