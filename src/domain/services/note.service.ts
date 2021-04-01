import { Injectable } from "@nestjs/common";
import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import { NoteDAO } from "../models"
import { NoteRepository } from "../../data/repositories"

@Injectable()
export class NoteService {
  async createNote(dataForm: any): Promise<any> {
    const noteDAO = NoteDAO.create(dataForm);
    const errors = await validate(noteDAO);

    if (errors.length > 0) throw new Error("Todos os campos deve conter no mínimo 6 caracteres!");
    return getCustomRepository(NoteRepository).createNote(noteDAO)
  }
}
