import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { HttpResult } from "../../common/helpers/http-result"

export type IJwTPayload = {
  id: number;
  iat: number;
  exp: number;
};

export class JwT {
  static async createToken(dataForm: any): Promise<object> {
    const { id, username, email, realm, emailVerified } = dataForm;

    const token = await jwt.sign({ id }, process.env.APP_SECRET || "secret", {
      expiresIn: "1d"
    })

    return {
      username,
      email,
      realm,
      emailVerified,
      token
    }
  }

  static async checkToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;

    try {
      if (!authHeader) throw new Error("Token indefinido!");

      const [, token] = authHeader.split(" ");
      const payload = (await jwt.verify(token, process.env.APP_SECRET || "secret")) as IJwTPayload;
      (<any>req).userId = payload.id
      return next();
    } catch (err) {
      const payload = HttpResult.badRequest(err);
      return res.status(payload.statusCode).json(payload.body);
    }
  }
}
