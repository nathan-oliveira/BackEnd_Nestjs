import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";

import { Length } from "class-validator";
import UserDAO from "./user.entity"

@Entity("notes")
class NoteDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Length(6, 255, { message: "Campo 'Título' deve conter no mínimo 6 á 200 caracteres!" })
  public title: string;

  @Column()
  @Length(6, 255, { message: "Campo 'Conteúdo' deve conter no mínimo 6 á 200 caracteres!" })
  public content: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @ManyToOne((type: any) => UserDAO, (user: any) => user.id)
  @JoinColumn({ name: "userId" })
  public userId: UserDAO;
}

export default NoteDAO;
