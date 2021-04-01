import { EntityRepository, Repository } from "typeorm"
import { NoteDAO } from "src/domain/models"
import { NoteDataService } from "src/presentation/usecases";

@EntityRepository(NoteDAO)
class NoteRepository extends Repository<NoteDAO> {
  async createNote(dataForm: NoteDataService): Promise<object> {
    try {
      return await this.manager.save(NoteDAO, dataForm);
    } catch (err) {
      throw new Error("Não foi possível realizar o cadastro!");
    }
  }

  async getAll(userId: number): Promise<NoteDAO[]> {
    return await this.manager.find(NoteDAO, { where: { userId } })
  }

  async getById(userId: number, id: number): Promise<NoteDAO[]> {
    return await this.manager.find(NoteDAO, { where: { id, userId } });
  }

  async updated(userId: number, id: number, dataForm: object): Promise<object> {
    try {
      return await this.manager.update(NoteDAO, { id, userId }, dataForm);
    } catch (err) {
      throw new Error("Não foi possível atualizar o cadastro!");
    }
  }

  async deleted(userId: number, id: number): Promise<object> {
    return await this.manager.delete(NoteDAO, { userId, id })
  }
}

export default NoteRepository
