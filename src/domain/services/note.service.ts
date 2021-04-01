import { Injectable } from "@nestjs/common";
import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import { NoteDAO } from "src/domain/models"
import { NoteRepository } from "src/data/repositories"

interface dataFormUpdate {
  title: string;
  content: string;
}

@Injectable()
export class NoteService {
  async createNote(dataForm: object): Promise<object> {
    const noteDAO = NoteDAO.create(dataForm);
    const errors = await validate(noteDAO);

    if (errors.length > 0) throw new Error("Todos os campos deve conter no mínimo 6 caracteres e no máximo 255 caracteres!");
    return await getCustomRepository(NoteRepository).createNote(noteDAO)
  }

  async getAll(userId: number): Promise<NoteDAO[]> {
    return await getCustomRepository(NoteRepository).getAll(userId);
  }

  async getById(userId: number, id: number): Promise<NoteDAO[]> {
    const item = await getCustomRepository(NoteRepository).getById(userId, id)

    if (item.length === 0) throw new Error("Item não encontrado!");
    return item;
  }

  async update(userId: number, id: number, dataForm: dataFormUpdate): Promise<object> {
    await this.getById(userId, id);
    await getCustomRepository(NoteRepository).updated(userId, id, dataForm)

    return await this.getById(userId, id);
  }

  async delete(userId: number, id: number): Promise<object> {
    await this.getById(userId, id);
    return await getCustomRepository(NoteRepository).deleted(userId, id)
  }
}
