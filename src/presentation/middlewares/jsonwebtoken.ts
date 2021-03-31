import * as jwt from "jsonwebtoken"
//import { Request, Response, NextFunction } from "express"

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
}
