import { Controller, Post, Req, Res, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "src/domain/services/user.service";
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

      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }

  @Post("/login")
  async login(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await this.userService.getUserByEmail({ email, password });
      const result = await BCrypt.comparePasswordHash(password, user[0]);

      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
  }
}
