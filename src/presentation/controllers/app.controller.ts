import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from "express";
import { AppService } from 'src/domain/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const dataForm = await this.appService.getHello();

    return res.status(HttpStatus.OK).json(dataForm);
  }
}
