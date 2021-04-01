import * as bcrypt from "bcrypt";
import { JwT } from "./jsonwebtoken";
import { IUserJwT } from "src/presentation/usecases"

export class BCrypt {
  static async createPasswordHash(password: string): Promise<string> {
    if (!password || password.length < 6) throw new Error("O campo 'password' não pode ser vazio e deve conter no minemo 6 caracteres!");
    return await bcrypt.hash(password, 8);
  }

  static async comparePasswordHash(password: string, user: IUserJwT): Promise<object> {
    if (!password) throw new Error("Favor preencha todos os campos!");
    if (!user) throw new Error("Usuário e/ou senha inválidos!");
    const compareUser = await bcrypt.compare(password, user.password)

    if (!compareUser) throw new Error("Usuário e/ou senha inválidos!");
    return JwT.createToken(user);
  }
}
