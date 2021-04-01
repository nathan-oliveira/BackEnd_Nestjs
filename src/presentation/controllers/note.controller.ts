import { Controller, Get, Post, Put, Delete, Req, Res, UseGuards } from "@nestjs/common";
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
      const { statusCode, body } = HttpResult.ok(result)

      return res.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, body } = HttpResult.badRequest(err);
      return res.status(statusCode).json(body);
    }
  }

  @UseGuards(RolesGuard)
  @Get("/notes")
  async getAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { userId } = (req as unknown) as { userId: number };
    const result = await this.noteService.getAll(userId);

    const { statusCode, body } = HttpResult.ok(result)
    return res.status(statusCode).json(body);
  }

  @UseGuards(RolesGuard)
  @Get("/notes/:id")
  async getById(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { id } = (req.params as unknown) as { id: number };
    const { userId } = (req as unknown) as { userId: number };

    try {
      const result = await this.noteService.getById(userId, id);
      const { statusCode, body } = HttpResult.ok(result);

      return res.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, body } = HttpResult.badRequest(err);
      return res.status(statusCode).json(body);
    }
  }

  @UseGuards(RolesGuard)
  @Put("/notes/:id")
  async update(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { id } = (req.params as unknown) as { id: number };
    const { userId } = (req as unknown) as { userId: number };

    try {
      const result = await this.noteService.update(userId, id, req.body);
      const { statusCode, body } = HttpResult.ok(result);

      return res.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, body } = HttpResult.badRequest(err);
      return res.status(statusCode).json(body);
    }
  }

  @UseGuards(RolesGuard)
  @Delete("/notes/:id")
  async delete(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { id } = (req.params as unknown) as { id: number };
    const { userId } = (req as unknown) as { userId: number };

    try {
      const result = await this.noteService.delete(userId, id);
      const { statusCode, body } = HttpResult.ok(result);

      return res.status(statusCode).json(body);
    } catch (err) {
      const { statusCode, body } = HttpResult.badRequest(err);
      return res.status(statusCode).json(body);
    }
  }
}
