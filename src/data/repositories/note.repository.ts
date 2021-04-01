import { EntityRepository, Repository } from "typeorm"
import { NoteDAO } from "../../domain/models"

@EntityRepository(NoteDAO)
class NoteRepository extends Repository<NoteDAO> {
  async createNote(dataForm: any): Promise<object> {
    try {
      return this.manager.save(NoteDAO, dataForm);
    } catch (err) {
      throw new Error("Não foi possível realizar o cadastro!");
    }
  }
}

export default NoteRepository
