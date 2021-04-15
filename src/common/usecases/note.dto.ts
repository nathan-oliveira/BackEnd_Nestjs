import { HttpRequest, HttpResponse } from "src/presentation/usecases";

export interface INote {
  create(req: HttpRequest, res: HttpResponse): Promise<HttpResponse>;
  getAll(req: HttpRequest, res: HttpResponse): Promise<HttpResponse>;
  getById(req: HttpRequest, res: HttpResponse): Promise<HttpResponse>;
  update(req: HttpRequest, res: HttpResponse): Promise<HttpResponse>;
  delete(req: HttpRequest, res: HttpResponse): Promise<HttpResponse>;
}
