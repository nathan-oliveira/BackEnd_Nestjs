import { EntityRepository, Repository } from "typeorm";
import { UserDAO } from "../../domain/models"

@EntityRepository(UserDAO)
class UserRepository extends Repository<UserDAO> {
  async createUser(dataForm: any): Promise<object> {
    const result = await this.getUserByEmail(dataForm.email)

    if (result.length === 0) {
      const { id, username, email, realm, emailVerified } = await this.manager.save(UserDAO, dataForm);
      return { id, username, email, realm, emailVerified }
    } else {
      throw new Error("E-mail informado já está cadastrado!");
    }
  }

  async getUserByEmail(email: string): Promise<UserDAO[]> {
    return await this.manager.find(UserDAO, { where: { email } });
  }
}

export default UserRepository;
