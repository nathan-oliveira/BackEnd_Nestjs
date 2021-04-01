import { Controller, Get, Post, Put, Delete, Req, Res, UseGuards, HttpStatus } from "@nestjs/common";
import { HttpRequest, HttpResponse, NoteCreateRequest } from "src/presentation/usecases";
import { NoteService } from "src/domain/services/note.service"
import { RolesGuard } from "src/domain/roles/roles.guard"


@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(RolesGuard)
  @Post("/notes")
  async create(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const { userId } = (req as unknown) as { userId: number };
    const dataForm = { ...req.body, userId } as NoteCreateRequest;

    try {
      const result = await this.noteService.createNote(dataForm);
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  @UseGuards(RolesGuard)
  @Get("/notes")
  async getAll(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const { userId } = (req as unknown) as { userId: number };
    const result = await this.noteService.getAll(userId);

    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(RolesGuard)
  @Get("/notes/:id")
  async getById(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const { id } = (req.params as unknown) as { id: number };
    const { userId } = (req as unknown) as { userId: number };

    try {
      const result = await this.noteService.getById(userId, id);
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  @UseGuards(RolesGuard)
  @Put("/notes/:id")
  async update(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const { id } = (req.params as unknown) as { id: number };
    const { userId } = (req as unknown) as { userId: number };

    try {
      const result = await this.noteService.update(userId, id, req.body);
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }

  @UseGuards(RolesGuard)
  @Delete("/notes/:id")
  async delete(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const { id } = (req.params as unknown) as { id: number };
    const { userId } = (req as unknown) as { userId: number };

    try {
      const result = await this.noteService.delete(userId, id);
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
    }
  }
}
