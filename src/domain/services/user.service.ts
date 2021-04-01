import { Injectable } from "@nestjs/common";
import { getCustomRepository } from "typeorm"
import { validate } from "class-validator";

import { UserDAO } from "src/domain/models"
import { UserRepository } from "src/data/repositories"

@Injectable()
export class UserService {
  async createUser(dataForm: any): Promise<object> {
    const userDAO = UserDAO.create(dataForm);
    const errors = await validate(userDAO);

    if (errors.length > 0) throw new Error("Todos os campos deve conter no mínimo 6 caracteres!");
    return await getCustomRepository(UserRepository).createUser(userDAO)
  }

  async getUserByEmail(dataForm: any): Promise<UserDAO[]> {
    if (!dataForm.email || !dataForm.password) throw new Error("Favor preencha todos os campos!");
    return await getCustomRepository(UserRepository).getUserByEmail(dataForm.email);
  }
}
