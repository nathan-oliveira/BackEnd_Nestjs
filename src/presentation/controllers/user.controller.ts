import { Controller, Post, Req, Res, HttpStatus } from "@nestjs/common";
import { IUser } from "src/common/usecases"
import { UserLoginRequest, UserCreateRequest, HttpRequest, HttpResponse } from "src/presentation/usecases";
import { UserService } from "src/domain/services/user.service";
import { BCrypt } from "src/presentation/middlewares/bcrypt";

@Controller()
export class UserController implements IUser {
  constructor(private readonly userService: UserService) {}

  @Post("/users")
  async create(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const { username, email, password, realm } = req.body as UserCreateRequest;

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
      return res.status(HttpStatus.FORBIDDEN).json({ error: err.message });
    }
  }

  @Post("/login")
  async login(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const { email, password } = req.body as UserLoginRequest;

    try {
      const user = await this.userService.getUserByEmail({ email, password });
      const result = await BCrypt.comparePasswordHash(password, user[0]);

      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.FORBIDDEN).json({ error: err.message });
    }
  }
}
