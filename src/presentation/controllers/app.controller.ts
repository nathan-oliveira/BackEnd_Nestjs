import { Controller, Get, Req, Res, HttpStatus } from "@nestjs/common";
import { AppService } from "src/domain/services/app.service";
import { HttpRequest, HttpResponse } from "src/presentation/usecases";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: HttpRequest, @Res() res: HttpResponse): Promise<HttpResponse> {
    const dataForm = await this.appService.getHello();
    return res.status(HttpStatus.OK).json(dataForm);
  }
}
