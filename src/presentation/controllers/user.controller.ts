import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "src/domain/services/user.service";
import { HttpResult } from "src/common/helpers/http-result";
import { BCrypt } from "src/presentation/middlewares/bcrypt";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/users")
  async create(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { username, email, password, realm } = req.body

    try {
      const passwordHash = await BCrypt.createPasswordHash(password);
      const result = await this.userService.createUser({
        username,
        email,
        password: passwordHash,
        realm
      })

      const { statusCode, body } = HttpResult.ok(result)
      return res.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, body } = HttpResult.badRequest(err);
      return res.status(statusCode).json(body);
    }
  }

  @Post("/login")
  async login(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await this.userService.getUserByEmail({ email, password });
      const result = await BCrypt.comparePasswordHash(password, user[0]);

      const { statusCode, body } = HttpResult.ok(result);
      return res.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, body } = HttpResult.badRequest(err);
      return res.status(statusCode).json(body);
    }
  }
}
