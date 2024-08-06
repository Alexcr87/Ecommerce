import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

/*function validateRequest(request:Request){
  const Authorization= request.headers['authorization']
  if (!Authorization) {
    throw new UnauthorizedException('Autorizzacion no encontrada')
  }

  const [authType, credentials] = Authorization.split(' ')

  if (authType !== 'Basic') {
    throw new UnauthorizedException('tipo invalido de autorizacion')
  }

  const [email, password] = Buffer.from(credentials, 'base64').toString('ascii').split(':')

  if (!email || !password) {  
    throw new UnauthorizedException('formato de autorizzacion invalido')
  }

  return true
}*/

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private readonly jwtService:JwtService){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest()
    
    const token = request.headers['authorization']?.split(' ')[1] ?? ''

    if(!token){
      throw new UnauthorizedException('Bearer token not found')
    }
    try {
      const secret = process.env.JWT_SECRET
      const payload = this.jwtService.verify(token, {secret})
      payload.iat = new Date(payload.iat * 1000)
      payload.exp =new Date(payload.exp * 1000)
      payload.roles = ['admin']
      request.user = payload
      return true
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}