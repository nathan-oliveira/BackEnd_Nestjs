import { Controller, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { NoteService } from "../../domain/services/note.service"
import { JwT } from "../middlewares/jsonwebtoken"
import { HttpResult } from "../../common/helpers/http-result"
import { BCrypt } from "../middlewares/bcrypt"

//"title": "string",
//"content": "string",

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post("/notes")
  async create(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { userId } = (req as unknown) as { userId: number };

    return res.status(200).json({ idUser: userId })
  }
}
