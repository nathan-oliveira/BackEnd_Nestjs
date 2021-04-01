import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from "express";
import { AppService } from '../../domain/services/app.service';
import { HttpResult } from '../../common/helpers/http-result';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const dataForm = await this.appService.getHello();
    const payload = HttpResult.ok(dataForm);

    return res.status(payload.statusCode).json(payload.body);
  }
}
