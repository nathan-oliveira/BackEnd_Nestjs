import { Controller, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { NoteService } from "../../domain/services/note.service"
import { RolesGuard } from "../../domain/roles/roles.guard"
import { HttpResult } from "src/common/helpers/http-result";

//"title": "string",
//"content": "string",

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(RolesGuard)
  @Post("/notes")
  async create(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { userId } = (req as unknown) as { userId: number };
    const dataForm = { ...req.body, userId };

    try {
      const result = await this.noteService.createNote(dataForm);
      const payload = HttpResult.ok(result)

      return res.status(payload.statusCode).json(payload.body);
    } catch (err) {
      const payload = HttpResult.badRequest(err);

      return res.status(payload.statusCode).json(payload.body);
    }
  }
}
