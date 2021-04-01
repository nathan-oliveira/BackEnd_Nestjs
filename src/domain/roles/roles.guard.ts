import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): any | Promise<any> | Observable<any> {
    const headers = context.getArgs()[0].headers
    const payload = this.checkAccess(headers.authorization)

    if (payload === false) {
      return false;
    } else {
      (<any>context.getArgs()[0]).userId = payload;
      return true;
    }
  }

  checkAccess(authHeader: string) {
    try {
      if (!authHeader) return false;

      const [, token] = authHeader.split(" ");
      const payload = (jwt.verify(token, process.env.APP_SECRET || "secret")) as { id: number; iat: number; exp: number; };
      if (payload.id) return payload.id;
    } catch (err) {
      return false;
    }
  }
}
