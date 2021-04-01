import { HttpRequest, HttpResponse } from "src/presentation/usecases";

export interface IUser {
  create(req: HttpRequest, res: HttpResponse): Promise<HttpResponse>;
  login(req: HttpRequest, res: HttpResponse): Promise<HttpResponse>;
}
