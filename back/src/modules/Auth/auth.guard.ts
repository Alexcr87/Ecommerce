import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

function validateRequest(request:Request){
  const Authorization= request.headers['authorization']
  if (!Authorization) {
    throw new UnauthorizedException('Authorization header not found');
  }

  const [authType, credentials] = Authorization.split(' ');

  if (authType !== 'Basic') {
    throw new UnauthorizedException('Invalid authorization type');
  }

  const [email, password] = Buffer.from(credentials, 'base64').toString('ascii').split(':');

  if (!email || !password) {  
    throw new UnauthorizedException('Invalid authorization format');
  }

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return validateRequest(request)
  }
}