import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async getHello(): Promise<object> {
    return { author: "Nathan Oliveira Mendonça" };
  }
}
